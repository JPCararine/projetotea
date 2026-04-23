package com.projetoteaauth.core;

import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import com.projetoteaauth.domain.Usuario;
import com.projetoteaauth.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.authorization.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.client.InMemoryRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.settings.AuthorizationServerSettings;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.OAuth2TokenFormat;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.security.oauth2.server.authorization.token.JwtEncodingContext;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenCustomizer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;

import java.lang.reflect.Array;
import java.security.KeyStore;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.time.Duration;
import java.util.Arrays;
import java.util.Collections;
import java.util.UUID;

@Configuration
@RequiredArgsConstructor
public class AuthorizationServerConfig {

    private final JwtKeyStoreProperties jwtKeyStoreProperties;

    private final UsuarioRepository usuarioRepository;

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {

        OAuth2AuthorizationServerConfigurer authorizationServerConfigurer =
                new OAuth2AuthorizationServerConfigurer();

        http
                .securityMatcher(authorizationServerConfigurer.getEndpointsMatcher())
                .with(authorizationServerConfigurer, (authorizationServer) -> {
                    authorizationServer
                            .oidc(Customizer.withDefaults());
                })
                .exceptionHandling(exceptions ->
                        exceptions.authenticationEntryPoint(
                                new LoginUrlAuthenticationEntryPoint("/login")
                        )
                )
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/login").permitAll()
                        .anyRequest().authenticated()
                );

        return http.formLogin(Customizer.withDefaults()).build();
    }
    @Bean
    public RegisteredClientRepository registeredClientRepository(PasswordEncoder passwordEncoder) {

        RegisteredClient projetoteaweb = RegisteredClient
                .withId(UUID.randomUUID().toString())
                .clientId("projetotea-web")
                .clientAuthenticationMethod(ClientAuthenticationMethod.NONE)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                .redirectUri("http://localhost:8080/authorized")
                .scope("READ")
                .scope("WRITE")
                .clientSettings(ClientSettings.builder()
                        .requireProofKey(true)
                        .requireAuthorizationConsent(false)
                        .build())
                .tokenSettings(TokenSettings.builder()
                        .accessTokenFormat(OAuth2TokenFormat.SELF_CONTAINED)
                        .accessTokenTimeToLive(Duration.ofMinutes(15))
                        .refreshTokenTimeToLive(Duration.ofDays(1))
                        .reuseRefreshTokens(false)
                        .build())
                .build();

        return new InMemoryRegisteredClientRepository(Collections.singletonList(projetoteaweb));
    }

    @Bean
    public AuthorizationServerSettings authorizationServerSettings() {
        return AuthorizationServerSettings.builder()
                .issuer("http://localhost:8081")
                .build();
    }

    @Bean
    public JWKSource<SecurityContext> jwkSource() {
        RSAKey rsaKey = gerarChave();
        return (jwkSelector, securityContext) -> jwkSelector.select(new com.nimbusds.jose.jwk.JWKSet(rsaKey));
    }

    private RSAKey gerarChave() {
        try {
            var resource = new ClassPathResource(jwtKeyStoreProperties.getPath());

            var keyStore = KeyStore.getInstance("PKCS12");
            keyStore.load(resource.getInputStream(),
                    jwtKeyStoreProperties.getPassword().toCharArray());

            var privateKey = (RSAPrivateKey) keyStore.getKey(
                    jwtKeyStoreProperties.getKeypairAlias(),
                    jwtKeyStoreProperties.getPassword().toCharArray()
            );

            var publicKey = (RSAPublicKey) keyStore.getCertificate(
                    jwtKeyStoreProperties.getKeypairAlias()
            ).getPublicKey();

            return new RSAKey.Builder(publicKey)
                    .privateKey(privateKey)
                    .keyID(jwtKeyStoreProperties.getKeypairAlias())
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao carregar keystore", e);
        }
    }
    @Bean
    public OAuth2TokenCustomizer<JwtEncodingContext> oauth2TokenCustomizer(UsuarioRepository usuarioRepository) {
        return context -> {
            Authentication authentication = context.getPrincipal();

            if(context.getTokenType().getValue().equals("access_token")) {

                String grantType = context.getAuthorizationGrantType().getValue();

                if("client_credentials".equals(grantType)) {
                    context.getClaims().claim("type", "client");
                } else {
                    context.getClaims().claim("type", "user");
                }
            }

            if (authentication.getPrincipal() instanceof UserDetails userDetails) {
                Usuario usuario = usuarioRepository.findByEmail(userDetails.getUsername());
                if (usuario == null) return;
                var authorities = userDetails.getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .toList();

                context.getClaims().claim("authorities", authorities);
                context.getClaims().claim("email", userDetails.getUsername());
                context.getClaims().claim("user_id", usuario.getId());


            }
        };

    }



}

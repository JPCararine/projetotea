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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.security.KeyStore;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.time.Duration;
import java.util.Collections;
import java.util.List;
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
                .cors(Customizer.withDefaults())
                .with(authorizationServerConfigurer, (authorizationServer) -> authorizationServer.oidc(Customizer.withDefaults()))
                .exceptionHandling(exceptions ->
                        exceptions.authenticationEntryPoint(new LoginUrlAuthenticationEntryPoint("/login"))
                )
                .authorizeHttpRequests(authorize -> authorize
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
                .redirectUri("http://localhost:3000/authorized")
                .scope("openid")
                .scope("profile")
                .scope("email")
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
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept", "Origin"));
        configuration.setExposedHeaders(List.of("Location"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
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
            keyStore.load(resource.getInputStream(), jwtKeyStoreProperties.getPassword().trim().toCharArray());

            var privateKey = (RSAPrivateKey) keyStore.getKey(
                    jwtKeyStoreProperties.getKeypairAlias(),
                    jwtKeyStoreProperties.getPassword().trim().toCharArray()
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

            if (authentication.getPrincipal() instanceof UserDetails userDetails) {
                Usuario usuario = usuarioRepository.findByEmail(userDetails.getUsername());

                if (usuario == null) {
                    return;
                }

                var authorities = userDetails.getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .toList();

                String displayName = formatDisplayName(userDetails.getUsername());
                context.getClaims().claim("name", displayName);
                context.getClaims().claim("display_name", displayName);
                context.getClaims().claim("authorities", authorities);
                context.getClaims().claim("email", userDetails.getUsername());
                context.getClaims().claim("user_id", usuario.getId());
                context.getClaims().claim("preferred_username", userDetails.getUsername());
                context.getClaims().claim("type", "user");
                return;
            }

            if ("client_credentials".equals(context.getAuthorizationGrantType().getValue())) {
                context.getClaims().claim("type", "client");
            }
        };
    }

    private String formatDisplayName(String email) {
        if (email == null || email.isBlank()) {
            return "Usuário logado";
        }

        String localPart = email.split("@")[0]
                .replace('.', ' ')
                .replace('_', ' ')
                .replace('-', ' ')
                .trim();

        if (localPart.isBlank()) {
            return "Usuário logado";
        }

        StringBuilder builder = new StringBuilder();
        for (String part : localPart.split("\\s+")) {
            if (part.isBlank()) {
                continue;
            }

            if (!builder.isEmpty()) {
                builder.append(' ');
            }

            builder.append(Character.toUpperCase(part.charAt(0)));
            if (part.length() > 1) {
                builder.append(part.substring(1).toLowerCase());
            }
        }

        return builder.toString();
    }
}

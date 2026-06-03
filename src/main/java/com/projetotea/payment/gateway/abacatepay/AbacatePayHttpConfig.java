package com.projetotea.payment.gateway.abacatepay;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
@EnableConfigurationProperties(AbacatePayConfig.class)
@RequiredArgsConstructor
public class AbacatePayHttpConfig {

    private final AbacatePayConfig abacatePayConfig;


    @Bean
    public RestClient abacatePayRestClient(RestClient.Builder builder) {
        return builder
                .baseUrl(abacatePayConfig.baseUrl())
                .defaultHeader("Authorization", "Bearer " + abacatePayConfig.apiKey())
                .defaultHeader("Content-Type", "application/json")
                .build();

    }
}

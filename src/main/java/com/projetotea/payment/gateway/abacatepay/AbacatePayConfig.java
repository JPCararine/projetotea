package com.projetotea.payment.gateway.abacatepay;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "projetotea.payment.abacatepay")
public record AbacatePayConfig (
    String baseUrl,
    String apiKey,
    String webhookSecret
    ) {

}

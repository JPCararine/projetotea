package com.projetotea.payment.gateway.abacatepay.dto.response.webhook;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record AbacatePayWebhookEventDTO (
        String event,
        Integer apiVersion,
        Boolean devMode,
        AbacatePayWebhookData data
) {
}


package com.projetotea.payment.gateway.abacatepay.dto.response.webhook;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record AbacatePayWebhookPayerDocument(
        String name,
        String taxId,
        Boolean isSameAsCustomer
) {
}

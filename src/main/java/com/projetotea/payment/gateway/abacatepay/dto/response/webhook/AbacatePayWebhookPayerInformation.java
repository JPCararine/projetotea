package com.projetotea.payment.gateway.abacatepay.dto.response.webhook;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record AbacatePayWebhookPayerInformation(
        String method,

        @JsonProperty("PIX")
        AbacatePayWebhookPayerDocument pix,

        @JsonProperty("CARD")
        AbacatePayWebhookCard card,

        @JsonProperty("BOLETO")
        AbacatePayWebhookPayerDocument boleto

) {
}
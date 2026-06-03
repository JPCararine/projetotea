package com.projetotea.payment.gateway.abacatepay.dto.response.webhook;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;



@JsonIgnoreProperties(ignoreUnknown = true)
public record AbacatePayWebhookData(
        AbacatePayWebhookCheckout checkout,
        AbacatePayWebhookCustomer customer,
        AbacatePayWebhookPayerInformation payerInformation
) {
}
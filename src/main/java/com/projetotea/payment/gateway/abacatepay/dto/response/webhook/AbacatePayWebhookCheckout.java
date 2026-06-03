package com.projetotea.payment.gateway.abacatepay.dto.response.webhook;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.OffsetDateTime;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record AbacatePayWebhookCheckout(
        String id,
        String externalId,
        String url,
        Integer amount,
        Integer paidAmount,
        Integer platformFee,
        String frequency,
        List<AbacatePayWebhookItem> items,
        String status,
        List<String> methods,
        String customerId,
        String receiptUrl,
        Integer installmentsCount,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {
}
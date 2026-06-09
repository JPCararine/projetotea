package com.projetotea.payment.gateway.abacatepay.dto.response.webhook;

import java.time.OffsetDateTime;
import java.util.List;

public record AbacatePayWebhookPayment(
        String id,
        String externalId,
        Integer amount,
        Integer paidAmount,
        Integer platformFee,
        String status,
        List<String> methods,
        String receiptUrl,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {
}
package com.projetotea.payment.gateway.abacatepay.dto.response.webhook;

import java.time.OffsetDateTime;

public record AbacatePayWebhookSubscription(
        String id,
        Integer amount,
        String currency,
        String method,
        String status,
        String frequency,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt,
        OffsetDateTime canceledAt,
        String cancelPolicy,
        String cancelledDueTo
) {
}

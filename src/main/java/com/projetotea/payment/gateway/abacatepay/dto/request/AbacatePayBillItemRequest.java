package com.projetotea.payment.gateway.abacatepay.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record AbacatePayBillItemRequest(
        @NotNull
        String id,
        @Min(1)
        Integer quantity
) {
}
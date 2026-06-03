package com.projetotea.payment.gateway.abacatepay.dto.response.checkout;

public record AbacatePayBillItemResponse(
        String id,
        Integer quantity
) {
}
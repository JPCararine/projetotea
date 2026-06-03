package com.projetotea.payment.gateway.abacatepay.dto.response.checkout;

public record AbacatePayBillResponse(
        AbacatePayBillData data,
        String error,
        Boolean success
) {
}
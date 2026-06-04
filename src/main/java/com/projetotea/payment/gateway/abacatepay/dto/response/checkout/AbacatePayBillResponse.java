package com.projetotea.payment.gateway.abacatepay.dto.response.checkout;

import com.projetotea.payment.gateway.abacatepay.dto.response.AbacatePayResponse;

public record AbacatePayBillResponse(
        AbacatePayBillData data,
        String error,
        Boolean success
) implements AbacatePayResponse {
}
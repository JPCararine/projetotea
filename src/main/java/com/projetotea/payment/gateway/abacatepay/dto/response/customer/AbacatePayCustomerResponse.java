package com.projetotea.payment.gateway.abacatepay.dto.response.customer;

public record AbacatePayCustomerResponse(
        AbacatePayCustomerData data,
        String error,
        Boolean success
) {
}

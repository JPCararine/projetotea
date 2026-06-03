package com.projetotea.payment.gateway.abacatepay.dto.response.checkout;

public record AssinaturaCheckoutResponse(
        Long assinaturaId,
        String checkoutUrl
) {
}
package com.projetotea.payment.gateway.abacatepay.dto.response.customer;

import java.util.Map;

public record AbacatePayCustomerData(
        String id,
        Boolean devMode,
        String name,
        String cellphone,
        String email,
        String taxId,
        String country,
        String zipCode,
        Map<String, Object> metadata
) {
}

package com.projetotea.payment.gateway.abacatepay.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public record AbacatePayCustomerRequest(
        @NotBlank
        @Email
        String email,
        String name,
        String cellphone,
        String taxId,
        String zipCode,
        Map<String, Object> metadata
) {
}

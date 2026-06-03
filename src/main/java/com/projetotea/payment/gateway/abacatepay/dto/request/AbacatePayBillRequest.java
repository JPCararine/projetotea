package com.projetotea.payment.gateway.abacatepay.dto.request;



import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;
import java.util.Map;
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public record AbacatePayBillRequest(
        @NotNull
        @Valid
        List<AbacatePayBillItemRequest> items,
        String customerId,
        String externalId,
        String returnUrl,
        String completionUrl,
        List<String> methods,
        Map<String, Object> metadata


) {
}
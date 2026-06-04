package com.projetotea.payment.gateway.abacatepay.dto.request;


import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record AbacatePaySubscriptionCancel (
    @NotNull
    String id
) {}

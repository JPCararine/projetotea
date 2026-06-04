package com.projetotea.payment.gateway.abacatepay.dto.response.subscription;


import com.projetotea.payment.gateway.abacatepay.dto.response.AbacatePayResponse;

public record AbacatePaySubscriptionResponse (
    AbacatePaySubscriptionData data,
    String error,
    Boolean success
    ) implements AbacatePayResponse {}

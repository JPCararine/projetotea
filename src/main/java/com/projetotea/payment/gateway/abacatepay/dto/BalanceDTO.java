package com.projetotea.payment.gateway.abacatepay.dto;

public record BalanceDTO (
    Long available,
    Long pending,
    Long blocked
) {}

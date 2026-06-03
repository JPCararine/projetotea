package com.projetotea.payment.gateway.abacatepay.dto;

public record StoreDto (
        String name,
        String id,
        BalanceDTO balance
) {}

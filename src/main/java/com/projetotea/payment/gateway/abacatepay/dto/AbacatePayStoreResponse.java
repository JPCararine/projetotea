package com.projetotea.payment.gateway.abacatepay.dto;

public record AbacatePayStoreResponse (
     StoreDto data,
     Boolean success,
     String error
) {

}

package com.projetotea.payment.gateway.abacatepay.dto.response.subscription;

import com.projetotea.payment.gateway.abacatepay.dto.response.checkout.AbacatePayBillItemResponse;
import com.projetotea.payment.gateway.abacatepay.dto.response.checkout.AbacatePayFineResponse;
import com.projetotea.payment.gateway.abacatepay.dto.response.checkout.AbacatePayInterestResponse;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;

public record AbacatePaySubscriptionData (
        String id,
        String externalId,
        String url,
        Integer amount,
        Integer paidAmount,
        List<AbacatePayBillItemResponse> items,
        String status,
        List<Object> coupons,
        Boolean devMode,
        String customerId,
        String returnUrl,
        String completionUrl,
        String receiptUrl,
        String upSellProductId,
        Integer installmentsCount,
        AbacatePayInterestResponse interest,
        AbacatePayFineResponse fine,
        Map<String, Object> metadata,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {}

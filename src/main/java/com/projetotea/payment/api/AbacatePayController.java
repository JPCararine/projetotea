package com.projetotea.payment.api;

import com.projetotea.api.DTO.AssinaturaRequest;
import com.projetotea.payment.domain.service.AbacatePayWebhookService;
import com.projetotea.payment.domain.service.AssinaturaPagamentoService;
import com.projetotea.payment.domain.service.AssinaturaService;
import com.projetotea.payment.gateway.abacatepay.AbacatePayClient;
import com.projetotea.payment.gateway.abacatepay.AbacatePayWebHookValidator;
import com.projetotea.payment.gateway.abacatepay.dto.AbacatePayStoreResponse;
import com.projetotea.payment.gateway.abacatepay.dto.request.AbacatePayBillRequest;
import com.projetotea.payment.gateway.abacatepay.dto.response.checkout.AbacatePayBillResponse;
import com.projetotea.payment.gateway.abacatepay.dto.response.checkout.AssinaturaCheckoutResponse;
import com.projetotea.payment.gateway.abacatepay.dto.response.webhook.AbacatePayWebhookEventDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("webhooks/abacatepay")
@RestController
@RequiredArgsConstructor
public class AbacatePayController {

    private final AbacatePayWebHookValidator validator;
    private final AssinaturaService assinaturaService;
    private final AbacatePayWebhookService abacatePayWebhookService;;



    @PostMapping("/checkout")
    public ResponseEntity<AssinaturaCheckoutResponse> postCheckout(@RequestBody AssinaturaRequest request) {
        return ResponseEntity.ok(assinaturaService.criar(request));
    }


    @PostMapping
    public ResponseEntity<Void> receberWebHook(
            @RequestParam("webhookSecret") String webhookSecret,
            @RequestBody AbacatePayWebhookEventDTO payload
            ) {
        validator.validarSecret(webhookSecret);
        System.out.println(payload);
        abacatePayWebhookService.processar(payload);

        return ResponseEntity.ok().build();
    }
}

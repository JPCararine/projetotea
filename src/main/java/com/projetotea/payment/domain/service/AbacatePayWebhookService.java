package com.projetotea.payment.domain.service;

import com.projetotea.domain.exception.AssinaturaNotFoundException;
import com.projetotea.infrastructure.repository.AssinaturaRepository;
import com.projetotea.payment.domain.model.Assinatura;
import com.projetotea.payment.gateway.abacatepay.dto.response.webhook.AbacatePayWebhookCheckout;
import com.projetotea.payment.gateway.abacatepay.dto.response.webhook.AbacatePayWebhookEventDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AbacatePayWebhookService {

    private final AssinaturaRepository assinaturaRepository;
    private final AssinaturaPagamentoService assinaturaPagamentoService;

    public void processar(AbacatePayWebhookEventDTO payload) {

        AbacatePayWebhookCheckout checkout = payload.data().checkout();

        if (!"checkout.completed".equals(payload.event())) {
            return;
        }

        if (!"PAID".equals(checkout.status())) {
            return;
        }

        Assinatura assinatura = assinaturaRepository
                .findByGatewayCheckoutId(checkout.id())
                .orElseThrow(AssinaturaNotFoundException::new);

        assinaturaPagamentoService.confirmarAssinatura(assinatura.getId());
    }
}
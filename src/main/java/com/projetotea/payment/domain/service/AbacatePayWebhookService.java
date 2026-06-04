package com.projetotea.payment.domain.service;

import com.projetotea.domain.exception.AssinaturaNotFoundException;
import com.projetotea.infrastructure.repository.AssinaturaRepository;
import com.projetotea.payment.domain.model.Assinatura;
import com.projetotea.payment.gateway.abacatepay.dto.response.webhook.AbacatePayWebhookCheckout;
import com.projetotea.payment.gateway.abacatepay.dto.response.webhook.AbacatePayWebhookEventDTO;
import com.projetotea.payment.gateway.abacatepay.dto.response.webhook.AbacatePayWebhookSubscription;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AbacatePayWebhookService {

    private final AssinaturaPagamentoService assinaturaPagamentoService;
    private final AssinaturaService assinaturaService;

    public void processar(AbacatePayWebhookEventDTO payload) {

        if (payload == null || payload.data() == null || payload.event() == null) {
            return;
        }

        if ("checkout.completed".equals(payload.event())) {
            assinaturaPagamentoService.processarCheckout(
                    payload.data().checkout(),
                    payload.data().subscription()
            );
            return;
        }
        if("subscription.completed".equals(payload.event())) {
            assinaturaPagamentoService.vincularSubscriptionViaWebhook(
                    payload.data().checkout(),
                    payload.data().subscription());
            return;
        }

        if ("subscription.cancelled".equals(payload.event())) {
            processarCancelamento(payload.data().subscription());
        }
    }
    private void processarCancelamento(AbacatePayWebhookSubscription subscription) {

        if (subscription == null) {
            return;
        }

        if (!"CANCELLED".equals(subscription.status())) {
            return;
        }

        assinaturaService.confirmarCancelamentoViaWebhook(subscription);
    }
}
package com.projetotea.payment.domain.service;

import com.projetotea.payment.domain.enums.GatewayWebhookStatus;
import com.projetotea.payment.domain.model.GatewayWebhookEvent;
import com.projetotea.payment.domain.repository.GatewayWebhookEventRepository;
import com.projetotea.payment.gateway.abacatepay.dto.response.webhook.AbacatePayWebhookEventDTO;
import com.projetotea.payment.gateway.abacatepay.dto.response.webhook.AbacatePayWebhookSubscription;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.OffsetDateTime;

@Service
@RequiredArgsConstructor
public class AbacatePayWebhookService {

    private static final String GATEWAY = "ABACATEPAY";
    private final AssinaturaPagamentoService assinaturaPagamentoService;
    private final AssinaturaService assinaturaService;
    private final GatewayWebhookEventRepository gatewayWebhookEventRepository;

    @Transactional
    public void processar(AbacatePayWebhookEventDTO payload) {

        if (payload == null || payload.data() == null || payload.event() == null) {
            return;
        }

        String eventKey = montarEventKey(payload);

        GatewayWebhookEvent webhookEvent = new GatewayWebhookEvent();
        webhookEvent.setGateway(GATEWAY);
        webhookEvent.setEventKey(eventKey);
        webhookEvent.setStatus(GatewayWebhookStatus.PROCESSING);
        webhookEvent.setReceivedAt(OffsetDateTime.now());
        webhookEvent.setEventType(payload.event());

        try {
            gatewayWebhookEventRepository.saveAndFlush(webhookEvent);
        } catch (DataIntegrityViolationException ex) {
            return;
        }

        processarEvento(payload);
        webhookEvent.setStatus(GatewayWebhookStatus.PROCESSED);
        webhookEvent.setProcessedAt(OffsetDateTime.now());


    }

    public void processarEvento(AbacatePayWebhookEventDTO payload) {



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

        if("subscription.renewed".equals(payload.event())) {

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

    public String montarEventKey(AbacatePayWebhookEventDTO payload) {
        String event = payload.event();

        return switch(event) {
            case "checkout.completed" -> event + ":" + requireCheckoutId(payload);

            case "checkout.disputed" -> event + ":" + requireCheckoutId(payload);

            case "checkout.refund" -> event + ":" + requireCheckoutId(payload);

            case "subscription.completed" ->
                    event + ":" + requireSubscriptionId(payload);

            case "subscription.renewed" ->
                    event + ":" + requirePaymentId(payload);

            case "subscription.cancelled" ->
                    event + ":" + requireSubscriptionId(payload);

            default -> throw new IllegalArgumentException("Evento não suportado: " + event);
        };


    }

    private String requireCheckoutId(AbacatePayWebhookEventDTO payload) {

        if (payload.data().checkout() == null ||
                !StringUtils.hasText(payload.data().checkout().id())) {

            throw new IllegalArgumentException(
                    "Webhook inválido: evento " + payload.event() + " sem checkout.id"
            );
        }

        return payload.data().checkout().id();
    }

    private String requireSubscriptionId(AbacatePayWebhookEventDTO payload) {

        if (payload.data().subscription() == null ||
                !StringUtils.hasText(payload.data().subscription().id())) {

            throw new IllegalArgumentException(
                    "Webhook inválido: evento " + payload.event() + " sem subscription.id"
            );
        }

        return payload.data().subscription().id();
    }

    private String requirePaymentId(AbacatePayWebhookEventDTO payload) {

        if (payload.data().payment() == null ||
                !StringUtils.hasText(payload.data().payment().id())) {

            throw new IllegalArgumentException(
                    "Webhook inválido: evento " + payload.event() + " sem payment.id"
            );
        }

        return payload.data().payment().id();
    }
}
package com.projetotea.payment.domain.service;

import com.projetotea.api.assembler.AssinaturaDTOAssembler;
import com.projetotea.domain.exception.AssinaturaNotFoundException;
import com.projetotea.domain.model.Plano;
import com.projetotea.payment.domain.repository.AssinaturaRepository;
import com.projetotea.payment.domain.model.Assinatura;
import com.projetotea.payment.domain.enums.StatusAssinatura;
import com.projetotea.payment.gateway.abacatepay.AbacatePayClient;
import com.projetotea.payment.gateway.abacatepay.dto.response.webhook.AbacatePayWebhookCheckout;
import com.projetotea.payment.gateway.abacatepay.dto.response.webhook.AbacatePayWebhookSubscription;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;

@Service
@RequiredArgsConstructor
public class AssinaturaPagamentoService {

    private final AssinaturaRepository assinaturaRepository;
    private final AbacatePayClient client;
    private final AssinaturaDTOAssembler assembler;


    @Transactional
    public void processarCheckout(
            AbacatePayWebhookCheckout checkout,
            AbacatePayWebhookSubscription subscription
    ) {

        if (checkout == null) {
            return;
        }

        if (!"PAID".equals(checkout.status())) {
            return;
        }

        Assinatura assinatura = assinaturaRepository.findByExternalId(checkout.externalId())
                .orElseThrow(AssinaturaNotFoundException::new);

        assinatura.setGatewayCheckoutId(checkout.id());

        if (subscription != null) {
            assinatura.setGatewaySubsId(subscription.id());
        }

        ativarAssinatura(assinatura);
    }

    private void ativarAssinatura(Assinatura assinatura) {

        if (assinatura.getStatus() == StatusAssinatura.ATIVA) {
            return;
        }

        Plano plano = assinatura.getPlano();

        OffsetDateTime now = OffsetDateTime.now();

        assinatura.setDataInicio(now);

        if (plano.getDuracaoDias() == null) {
            assinatura.setDataFim(null);
        } else {
            assinatura.setDataFim(now.plusDays(plano.getDuracaoDias()));
        }

        assinatura.setStatus(StatusAssinatura.ATIVA);
    }


    @Transactional
    public void vincularSubscriptionViaWebhook(
            AbacatePayWebhookCheckout checkout,
            AbacatePayWebhookSubscription subscription
    ) {
        if (checkout == null || subscription == null) {
            return;
        }

        Assinatura assinatura = assinaturaRepository
                .findByExternalId(checkout.externalId())
                .orElseThrow(AssinaturaNotFoundException::new);

        assinatura.setGatewayCheckoutId(checkout.id());
        if (assinatura.getGatewaySubsId() == null) {
            assinatura.setGatewaySubsId(subscription.id());
        }
    }


}

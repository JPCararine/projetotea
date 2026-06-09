package com.projetotea.payment.domain.service;

import com.projetotea.api.DTO.AssinaturaDTO;
import com.projetotea.api.DTO.AssinaturaRequest;
import com.projetotea.api.assembler.AssinaturaDTOAssembler;
import com.projetotea.core.security.TeaSecurity;
import com.projetotea.domain.exception.AssinaturaNotFoundException;
import com.projetotea.domain.exception.NegocioException;
import com.projetotea.domain.exception.PlanoNotFoundException;
import com.projetotea.domain.exception.UsuarioNotFoundException;
import com.projetotea.domain.model.FormaPagamento;
import com.projetotea.payment.domain.model.Assinatura;
import com.projetotea.domain.model.Plano;
import com.projetotea.payment.domain.enums.StatusAssinatura;
import com.projetotea.domain.model.Usuario;
import com.projetotea.payment.domain.repository.AssinaturaRepository;
import com.projetotea.infrastructure.repository.PlanoRepository;
import com.projetotea.infrastructure.repository.UsuarioRepository;
import com.projetotea.payment.gateway.abacatepay.AbacatePayClient;
import com.projetotea.payment.gateway.abacatepay.dto.request.AbacatePayBillItemRequest;
import com.projetotea.payment.gateway.abacatepay.dto.request.AbacatePayBillRequest;
import com.projetotea.payment.gateway.abacatepay.dto.request.AbacatePayCustomerRequest;
import com.projetotea.payment.gateway.abacatepay.dto.request.AbacatePaySubscriptionCancel;
import com.projetotea.payment.gateway.abacatepay.dto.response.checkout.AbacatePayBillResponse;
import com.projetotea.payment.gateway.abacatepay.dto.response.checkout.AssinaturaCheckoutResponse;
import com.projetotea.payment.gateway.abacatepay.dto.response.subscription.AbacatePaySubscriptionResponse;
import com.projetotea.payment.gateway.abacatepay.dto.response.webhook.AbacatePayWebhookSubscription;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AssinaturaService {

    private final AssinaturaRepository assinaturaRepository;
    private final PlanoRepository planoRepository;
    private final TeaSecurity teaSecurity;
    private final UsuarioRepository usuarioRepository;
    private final AbacatePayClient client;
    private final AssinaturaDTOAssembler assembler;



    public List<AssinaturaDTO> listAll() {
        Long usuarioId = teaSecurity.getUsuarioId();

        return assinaturaRepository.findByUsuarioId(usuarioId).stream()
                .map(assembler::toDTO)
                .toList();
    }

    @Transactional
    public AssinaturaCheckoutResponse criar(AssinaturaRequest assinaturaRequest) {
        Long usuarioId = teaSecurity.getUsuarioId();

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(UsuarioNotFoundException::new);

        Plano plano = planoRepository.findById(assinaturaRequest.getPlanoId())
                .orElseThrow(PlanoNotFoundException::new);

        Assinatura assinaturaAtiva = assinaturaRepository.findByUsuarioIdAndStatus(usuarioId, StatusAssinatura.ATIVA)
                .orElse(null);
        Assinatura assinaturaPendente = assinaturaRepository.findByUsuarioIdAndStatus(usuarioId, StatusAssinatura.PENDENTE)
                .orElse(null);


        if(assinaturaAtiva != null) {
            if (assinaturaAtiva.getPlano().getId().equals(plano.getId())) {
                throw new NegocioException("Você já possui esse plano ativo");
            }
            throw new NegocioException("Você já possui uma assinatura ativa");
        }


        if (assinaturaPendente != null && assinaturaPendente.getPlano().getId().equals(plano.getId())
                && assinaturaPendente.getFormaPagamento() == assinaturaRequest.getFormaPagamento()) {
            throw new NegocioException(
                    "Você já possui uma assinatura pendente para esse plano e forma de pagamento. " +
                            "Conclua o pagamento, troque a forma de pagamento ou cancele o checkout."
            );
        }
        if(usuario.getCustomerId() == null) {
            var customerRequest = AbacatePayCustomerRequest
                    .builder()
                    .email(usuario.getEmail())
                    .name(usuario.getNome())
                    .taxId(usuario.getCpf())
                    .cellphone(usuario.getTelefone())
                    .metadata(Map.of(
                            "plano", plano.getNome()
                    ))
                    .build();

            var response = client.postClient(customerRequest);

            usuario.setCustomerId(response.data().id());
        }


        Assinatura assinatura = Assinatura.builder()
                .usuario(usuario)
                .plano(plano)
                .status(StatusAssinatura.PENDENTE)
                .formaPagamento(FormaPagamento.valueOf(assinaturaRequest.getFormaPagamento().name()))
                .dataInicio(null)
                .dataFim(null)
                .build();

        assinatura = assinaturaRepository.saveAndFlush(assinatura);

        var checkoutRequest = AbacatePayBillRequest.builder()
                .items(List.of(new AbacatePayBillItemRequest(
                        plano.getAbacatePayProductId(), 1
                )))
                .customerId(usuario.getCustomerId())
                .externalId("assinatura-" + assinatura.getId())
                .methods(List.of(assinaturaRequest.getFormaPagamento().name()))
                .metadata(Map.of(
                        "usuarioId", usuario.getId().toString(),
                        "planoId", plano.getId().toString(),
                        "assinaturaId", assinatura.getId().toString()
                ))
                .build();


        String urlPagamento;


        if (plano.getDuracaoDias() == null) {
            AbacatePayBillResponse response = client.postCheckout(checkoutRequest);

            assinatura.setExternalId(response.data().externalId());

            urlPagamento = response.data().url();

        } else {

            AbacatePaySubscriptionResponse response = client.postSubscription(checkoutRequest);

            assinatura.setExternalId(response.data().externalId());

            urlPagamento = response.data().url();
        }




        return new AssinaturaCheckoutResponse(
                assinatura.getId(),
                urlPagamento
        );
    }
    @Transactional
    public void cancelar() {

        Long usuarioId = teaSecurity.getUsuarioId();

        Assinatura assinatura = assinaturaRepository.findByUsuarioIdAndStatus(usuarioId, StatusAssinatura.ATIVA)
                .orElseThrow(() -> new AssinaturaNotFoundException());

        if (assinatura.getGatewaySubsId() == null) {
            throw new NegocioException("Essa assinatura não possui uma subscription ativa no gateway.");
        }

        var cancelRequest = AbacatePaySubscriptionCancel.builder()
                        .id(assinatura.getGatewaySubsId())
                                .build();

        client.cancelSubscription(cancelRequest);


        assinatura.setStatus(StatusAssinatura.CANCELAMENTO_SOLICITADO);

        assinaturaRepository.save(assinatura);
    }

    @Transactional
    public void confirmarCancelamentoViaWebhook(AbacatePayWebhookSubscription subscription) {

        Assinatura assinatura = assinaturaRepository
                .findByGatewaySubsId(subscription.id())
                .orElseThrow(AssinaturaNotFoundException::new);

        if (assinatura.getStatus() == StatusAssinatura.CANCELADA) {
            return;
        }

        assinatura.setStatus(StatusAssinatura.CANCELADA);
        assinatura.setDataCancelamento(subscription.canceledAt());
    }



}

package com.projetotea.payment.domain.service;

import com.projetotea.api.DTO.AssinaturaDTO;
import com.projetotea.api.assembler.AssinaturaDTOAssembler;
import com.projetotea.domain.exception.AssinaturaNotFoundException;
import com.projetotea.domain.model.Plano;
import com.projetotea.infrastructure.repository.AssinaturaRepository;
import com.projetotea.payment.domain.model.Assinatura;
import com.projetotea.payment.domain.enums.StatusAssinatura;
import com.projetotea.payment.gateway.abacatepay.AbacatePayClient;
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
    public AssinaturaDTO confirmarAssinatura(Long assinaturaId) {

        Assinatura assinatura = assinaturaRepository.findById(assinaturaId)
                .orElseThrow(AssinaturaNotFoundException::new);

        if (assinatura.getStatus() == StatusAssinatura.ATIVA) {
            return assembler.toDTO(assinatura);
        }

        Plano plano = assinatura.getPlano();

        OffsetDateTime now = OffsetDateTime.now();

        assinatura.setDataInicio(now);

        if(plano.getDuracaoDias() == null) {
            assinatura.setDataFim(null);
        } else {
            assinatura.setDataFim(now.plusDays(plano.getDuracaoDias()));
        }

        assinatura.setStatus(StatusAssinatura.ATIVA);

        return assembler.toDTO(assinaturaRepository.save(assinatura));
    }




}

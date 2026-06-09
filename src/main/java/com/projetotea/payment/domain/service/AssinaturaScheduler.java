package com.projetotea.payment.domain.service;

import com.projetotea.payment.domain.enums.StatusAssinatura;
import com.projetotea.payment.domain.repository.AssinaturaRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;

@Service
@RequiredArgsConstructor
public class AssinaturaScheduler {

    private final AssinaturaRepository assinaturaRepository;

    @Scheduled(cron = "0 0 * * * *")
    @Transactional
    public void atualizarStatusAssinatura() {
        OffsetDateTime agora = OffsetDateTime.now();
        assinaturaRepository.emAtrasoAssinatura(
                StatusAssinatura.ATIVA,
                StatusAssinatura.EM_ATRASO,
                agora
        );

        assinaturaRepository.expirarAssinatura(
                StatusAssinatura.EM_ATRASO,
                StatusAssinatura.EXPIRADA,
                agora.minusDays(3)
        );
    }

}

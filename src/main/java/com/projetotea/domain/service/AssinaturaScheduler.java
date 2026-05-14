package com.projetotea.domain.service;

import com.projetotea.domain.model.Assinatura;
import com.projetotea.domain.model.StatusAssinatura;
import com.projetotea.infrastructure.repository.AssinaturaRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssinaturaScheduler {

    private final AssinaturaRepository assinaturaRepository;

    @Scheduled(cron = "0 0 * * * *")
    @Transactional
    public void expirarAssinatura() {
        assinaturaRepository.expirarAssinaturas(
                StatusAssinatura.ATIVA,
                StatusAssinatura.EXPIRADA,
                OffsetDateTime.now()
        );
    }
}

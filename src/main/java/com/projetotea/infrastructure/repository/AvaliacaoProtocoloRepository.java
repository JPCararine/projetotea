package com.projetotea.infrastructure.repository;

import com.projetotea.domain.model.AvaliacaoProtocolo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AvaliacaoProtocoloRepository extends JpaRepository<AvaliacaoProtocolo, Long> {

    List<AvaliacaoProtocolo> findByAtivoTrueOrderByNomeAscVersaoAsc();

    Optional<AvaliacaoProtocolo> findByCodigoAndVersao(String codigo, String versao);
}

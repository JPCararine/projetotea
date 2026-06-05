package com.projetotea.infrastructure.repository;

import com.projetotea.domain.model.AvaliacaoScoreCategoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AvaliacaoScoreCategoriaRepository extends JpaRepository<AvaliacaoScoreCategoria, Long> {

    List<AvaliacaoScoreCategoria> findByAvaliacaoIdAndNivelIsNullOrderByCategoriaCodigoAsc(Long avaliacaoId);

    List<AvaliacaoScoreCategoria> findByAvaliacaoIdAndNivelOrderByCategoriaCodigoAsc(Long avaliacaoId, Integer nivel);
}

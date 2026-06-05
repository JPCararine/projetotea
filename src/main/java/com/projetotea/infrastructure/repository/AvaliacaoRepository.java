package com.projetotea.infrastructure.repository;

import com.projetotea.domain.model.Avaliacao;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

    List<Avaliacao> findByPacienteIdOrderByCriadoEmDesc(Long pacienteId);

    @EntityGraph(attributePaths = {"paciente", "protocolo", "criadoPor", "respostas", "scores"})
    Optional<Avaliacao> findWithDetailsById(Long id);
}

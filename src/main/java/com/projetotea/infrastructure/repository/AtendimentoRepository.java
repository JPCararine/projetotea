package com.projetotea.infrastructure.repository;

import com.projetotea.domain.model.Atendimento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;


public interface AtendimentoRepository extends JpaRepository<Atendimento, Long>, JpaSpecificationExecutor<Atendimento> {


    @Query("""
    SELECT COUNT(a) > 0 FROM Atendimento a
    WHERE a.dataAtendimento = :dataAtendimento
    AND a.paciente.id = :pacienteId
    AND a.horaInicio < :horaFim
    AND a.horaFim > :horaInicio
    AND a.status NOT IN ('CANCELADO', 'FINALIZADO')
    """)
    boolean existsConflitoPaciente(
            LocalDate dataAtendimento,
            LocalTime horaFim,
            LocalTime horaInicio,
            Long pacienteId
    );
    @Query("""
    SELECT COUNT(a) > 0 FROM Atendimento a
    JOIN a.usuarios u
    WHERE a.dataAtendimento = :dataAtendimento
    AND u.id IN :usuariosIds
    AND a.horaInicio < :horaFim
    AND a.horaFim > :horaInicio
    AND a.status NOT IN ('CANCELADO', 'FINALIZADO')
    """)
    boolean existsConflitoUsuarios(
            LocalDate dataAtendimento,
            LocalTime horaFim,
            LocalTime horaInicio,
            List<Long> usuariosIds
    );

    Optional<Atendimento> findByIdAndUsuariosId(Long atendimentoId, Long usuarioId);

}

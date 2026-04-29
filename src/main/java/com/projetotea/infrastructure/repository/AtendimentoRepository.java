package com.projetotea.infrastructure.repository;

import com.projetotea.domain.model.Atendimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDate;
import java.time.LocalTime;


public interface AtendimentoRepository extends JpaRepository<Atendimento, Long>, JpaSpecificationExecutor<Atendimento> {

    boolean existsByDataAtendimentoAndHoraInicioLessThanAndHoraFimGreaterThan(
            LocalDate dataAtendimento,
            LocalTime horaFim,
            LocalTime horaInicio
    );
}

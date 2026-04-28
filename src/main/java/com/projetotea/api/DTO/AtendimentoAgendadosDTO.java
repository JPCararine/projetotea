package com.projetotea.api.DTO;

import com.projetotea.domain.model.StatusAtendimento;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
@Data
@AllArgsConstructor
public class AtendimentoAgendadosDTO {

    private String codigo;

    private StatusAtendimento status;

    private LocalDate dataAtendimento;

    private LocalTime horaInicio;
    private LocalTime horaFim;

    private Long pacienteId;
    private String pacienteNome;

    private Long usuarioId;
    private String usuarioNome;

    
}

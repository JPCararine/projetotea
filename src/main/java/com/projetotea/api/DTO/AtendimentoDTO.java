package com.projetotea.api.DTO;

import com.projetotea.domain.model.Paciente;
import com.projetotea.domain.model.StatusAtendimento;
import com.projetotea.domain.model.Usuario;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class AtendimentoDTO {


    private String codigo;

    private LocalDateTime dataHora;

    private String observacoes;

    private StatusAtendimento status;

    private LocalDate dataAtendimento;
    private LocalTime horaInicio;
    private LocalTime horaFim;

    private LocalDateTime dataCriacao;

    private LocalDateTime dataCancelamento;

    private LocalDateTime dataFinalizado;


    private Paciente paciente;


    private Usuario usuario;
}

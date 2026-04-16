package com.projetotea.api.DTO;

import com.projetotea.domain.model.Paciente;
import com.projetotea.domain.model.StatusAtendimento;
import com.projetotea.domain.model.Usuario;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class AtendimentoInputDTO {


    private String observacoes;

    private LocalDate dataAtendimento;

    private LocalDateTime HoraInicio;

    private LocalDateTime HoraFim;

    private Paciente paciente;


    private Usuario usuario;
}

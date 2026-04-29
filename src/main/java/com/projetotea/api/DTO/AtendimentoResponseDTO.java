package com.projetotea.api.DTO;

import com.projetotea.domain.model.StatusAtendimento;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
public class AtendimentoResponseDTO {

    private Long id;
    private String codigo;
    private LocalDate dataAtendimento;
    private LocalTime horaInicio;
    private LocalTime horaFim;
    private String observacoes;
    private StatusAtendimento status;
    private String nomePaciente;
    private List<String> nomesUsuarios;

}

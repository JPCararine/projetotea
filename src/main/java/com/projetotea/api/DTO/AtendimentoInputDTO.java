package com.projetotea.api.DTO;

import com.projetotea.domain.model.Paciente;
import com.projetotea.domain.model.StatusAtendimento;
import com.projetotea.domain.model.Usuario;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
public class AtendimentoInputDTO {


    private String observacoes;
    @NotNull
    private LocalDate dataAtendimento;
    @NotNull
    private LocalTime horaInicio;
    @NotNull
    private LocalTime horaFim;

    @NotNull
    @Valid
    private PacienteIdInputDTO paciente;
    @Valid
    @NotNull
    private List<UsuarioIdInputDTO> usuarios;


}

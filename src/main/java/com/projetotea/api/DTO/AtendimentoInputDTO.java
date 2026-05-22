package com.projetotea.api.DTO;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;
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

package com.projetotea.api.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Data
public class PacienteInputDTO {


    @NotBlank
    private String nome;
    @NotNull
    private LocalDate dataNascimento;
    @NotBlank
    @Pattern(regexp = "\\d{11}")
    private String cpf;

    private String telefone;
    @NotNull
    private GeneroPacienteInputDTO genero;


}

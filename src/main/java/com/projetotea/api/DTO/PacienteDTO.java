package com.projetotea.api.DTO;

import lombok.Data;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Data
public class PacienteDTO {

    private Long id;

    private String nome;

    private LocalDate dataNascimento;

    private String cpf;

    private String telefone;

    private GeneroPacienteDTO genero;

    private OffsetDateTime dataCadastro;
}

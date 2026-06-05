package com.projetotea.api.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AvaliacaoProtocoloInputDTO {

    @NotBlank
    private String codigo;

    @NotBlank
    private String nome;

    @NotBlank
    private String versao;

    @NotBlank
    private String estruturaJson;

    @NotNull
    private Boolean ativo;
}

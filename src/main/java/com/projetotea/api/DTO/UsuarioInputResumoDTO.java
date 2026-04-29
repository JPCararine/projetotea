package com.projetotea.api.DTO;

import com.projetotea.api.DTO.CategoriaUsuario.CategoriaUsuarioInputDTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UsuarioInputResumoDTO {

    @NotBlank
    private String nome;

    @NotNull
    private CategoriaUsuarioInputDTO categoria;
}

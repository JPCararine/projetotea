package com.projetotea.api.DTO;

import com.projetotea.api.DTO.CategoriaUsuario.CategoriaUsuarioInputDTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
@AllArgsConstructor
public class UsuarioInputDTO {

    @NotBlank
    private String nome;
    @NotBlank
    private String email;
    @NotNull
    private String senha;

    @NotNull
    private CategoriaUsuarioInputDTO categoria;

}

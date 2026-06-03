package com.projetotea.api.DTO;

import com.projetotea.api.DTO.CategoriaUsuario.CategoriaUsuarioInputDTO;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;


@Data
@Builder
@AllArgsConstructor
public class UsuarioInputDTO {

    @NotBlank
    private String nome;
    @NotBlank
    @Email
    private String email;
    @NotNull
    private String senha;

    @NotBlank
    @CPF
    private String cpf;

    @NotBlank
    private String telefone;

    @NotNull
    private CategoriaUsuarioInputDTO categoria;

}

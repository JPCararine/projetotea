package com.projetotea.api.DTO;

import com.projetotea.api.DTO.CategoriaUsuario.CategoriaUsuarioInputDTO;
import com.projetotea.domain.model.Atendimento;
import com.projetotea.domain.model.CategoriaUsuario;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.List;

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

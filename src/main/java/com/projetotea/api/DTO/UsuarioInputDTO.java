package com.projetotea.api.DTO;

import com.projetotea.api.DTO.CategoriaUsuario.CategoriaUsuarioInputDTO;
import com.projetotea.domain.model.Atendimento;
import com.projetotea.domain.model.CategoriaUsuario;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.List;

@Data
@Builder
public class UsuarioInputDTO {

    private String nome;

    private String email;

    private String senha;


    private CategoriaUsuarioInputDTO categoria;

}

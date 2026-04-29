package com.projetotea.api.DTO;

import com.projetotea.api.DTO.CategoriaUsuario.CategoriaUsuarioDTO;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.List;

@Data
public class UsuarioDTO {

    private Long id;

    private String nome;

    private String email;

    private OffsetDateTime dataCadastro;

    private CategoriaUsuarioDTO categoria;

    private List<AtendimentoFiltroDTO> atendimentos;
}

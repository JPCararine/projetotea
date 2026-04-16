package com.projetotea.api.DTO;

import com.projetotea.api.DTO.CategoriaUsuario.CategoriaUsuarioDTO;
import lombok.Data;

@Data
public class UsuarioIdNomeEmail {

    private Long id;

    private String nome;

    private String email;

    private CategoriaUsuarioDTO categoria;
}

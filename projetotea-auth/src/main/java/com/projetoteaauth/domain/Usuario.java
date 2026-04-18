package com.projetoteaauth.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;


@Entity
@Data
public class Usuario {

    @Id
    private Long id;

    private String email;
    private String senha;

    private CategoriaUsuario categoriaUsuario;


}
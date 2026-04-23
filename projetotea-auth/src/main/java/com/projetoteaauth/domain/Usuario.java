package com.projetoteaauth.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;


@Entity
@Data

public class Usuario {

    @Id
    private Long id;

    private String email;
    private String senha;

    @Column(name = "categoria")
    @Enumerated(EnumType.STRING)
    private CategoriaUsuario categoriaUsuario;


}
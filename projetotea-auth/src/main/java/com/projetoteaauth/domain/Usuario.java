package com.projetoteaauth.domain;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Usuario {

    @Id
    @EqualsAndHashCode.Include
    private Long id;

    private String email;
    private String senha;

    @Column(name = "categoria")
    @Enumerated(EnumType.STRING)
    private CategoriaUsuario categoriaUsuario;


}

package com.projetotea.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

@Entity
@Builder
@Data
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String nome;

    private String email;

    private String senha;

    private OffsetDateTime dataCadastro;


    @Enumerated(EnumType.STRING)
    private CategoriaUsuario categorias;

    @OneToMany(mappedBy = "usuario")
    private List<Atendimento> atendimentos;

    public Usuario() {

    }
}

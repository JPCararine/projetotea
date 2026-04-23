package com.projetotea.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

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

    @CreationTimestamp
    private OffsetDateTime dataCadastro;

    @ManyToMany
    private List<Paciente> pacientes;


    @Enumerated(EnumType.STRING)
    private CategoriaUsuario categoria;

    @OneToMany(mappedBy = "usuario")
    private List<Atendimento> atendimentos;

    public Usuario() {

    }
}

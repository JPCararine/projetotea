package com.projetotea.domain.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
public class Paciente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private LocalDate dataNascimento;

    private String cpf;

    private String telefone;

    private OffsetDateTime dataCadastro;

    @ManyToMany
    private List<Usuario> usuario;


    @OneToMany(mappedBy = "paciente")
    private List<Atendimento> atendimentos;
    @Enumerated(EnumType.STRING)
    private GeneroPaciente genero;



    public Paciente() {

    }
}

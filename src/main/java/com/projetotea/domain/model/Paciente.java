package com.projetotea.domain.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Builder
@AllArgsConstructor
public class Paciente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nome;

    private LocalDate dataNascimento;

    private String cpf;

    private String telefone;

    @CreationTimestamp
    private OffsetDateTime dataCadastro;


    @OneToMany(mappedBy = "paciente")
    private List<Atendimento> atendimentos;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private GeneroPaciente genero;

    @OneToMany(mappedBy = "paciente")
    private Set<UsuarioPaciente> usuarios;



    public Paciente() {

    }
}

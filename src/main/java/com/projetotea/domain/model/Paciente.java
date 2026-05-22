package com.projetotea.domain.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Paciente {
    @Id
    @EqualsAndHashCode.Include
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

}

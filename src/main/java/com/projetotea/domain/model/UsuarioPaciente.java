package com.projetotea.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;

@Data
@Entity
@Table(name = "paciente_usuario")
@AllArgsConstructor
public class UsuarioPaciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Usuario usuario;

    @ManyToOne
    private Paciente paciente;

    public UsuarioPaciente() {
    }
}

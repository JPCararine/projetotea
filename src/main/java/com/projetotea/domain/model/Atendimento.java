package com.projetotea.domain.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
public class Atendimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigo;

    private LocalDateTime dataHora;

    private String observacoes;

    @Enumerated(EnumType.STRING)
    private StatusAtendimento status;

    private LocalDateTime dataCriacao;

    private LocalDateTime dataCancelamento;

    private LocalDateTime dataFinalizado;

    @ManyToOne
    private Paciente paciente;

    @ManyToOne
    private Usuario usuario;

    @PrePersist
    private void gerarCodigo() {
        setCodigo(UUID.randomUUID().toString());
    }
}

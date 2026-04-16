package com.projetotea.domain.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
public class Atendimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigo;

    @Column(name = "data_atendimento", nullable = false)
    private LocalDate dataAtendimento;

    @Column(name = "hora_inicio", nullable = false)
    private LocalTime horaInicio;

    @Column(name = "hora_fim", nullable = false)
    private LocalTime horaFim;

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
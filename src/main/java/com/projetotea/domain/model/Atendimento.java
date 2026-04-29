package com.projetotea.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
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
    @CreationTimestamp
    private LocalDate dataCriacao;

    private LocalDate dataCancelamento;

    private LocalDate dataFinalizado;

    @ManyToOne
    private Paciente paciente;

    @ManyToMany
    @JoinTable(
            name= "atendimento_usuario",
            joinColumns = @JoinColumn(name = "atendimento_id"),
            inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    private List<Usuario> usuarios;

    @PrePersist
    private void gerarCodigo() {
        setCodigo(UUID.randomUUID().toString());
    }
}
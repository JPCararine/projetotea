package com.projetotea.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;

@Entity
@Data
public class Assinatura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Usuario usuario;

    @ManyToOne
    private Plano plano;

    @CreationTimestamp
    @JoinColumn(name = "data_inicio")
    private OffsetDateTime dataInicio;
    @JoinColumn(name = "data_fim")
    private OffsetDateTime dataFim;

    @Enumerated(EnumType.STRING)
    private StatusAssinatura status;
}

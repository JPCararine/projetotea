package com.projetotea.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
public class Assinatura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private Usuario usuario;

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private Plano plano;

    @CreationTimestamp
    @Column(name = "data_inicio", nullable = false)
    private OffsetDateTime dataInicio;
    @Column(name = "data_fim")
    private OffsetDateTime dataFim;

    @Enumerated(EnumType.STRING)
    private StatusAssinatura status;

    public Assinatura() {

    }
}

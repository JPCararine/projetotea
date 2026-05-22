package com.projetotea.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Assinatura {

    @Id
    @EqualsAndHashCode.Include
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

}

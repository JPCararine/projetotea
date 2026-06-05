package com.projetotea.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class AvaliacaoScoreCategoria {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "avaliacao_id", nullable = false)
    private Avaliacao avaliacao;

    private Integer nivel;

    @Column(nullable = false, length = 50)
    private String categoriaCodigo;

    @Column(nullable = false)
    private String categoriaNome;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal mediaPercentual;

    @Column(nullable = false)
    private Integer itensPontuados;

    @Column(nullable = false)
    private Integer itensNaoObservados;

    @Column(nullable = false)
    private Integer totalItens;
}

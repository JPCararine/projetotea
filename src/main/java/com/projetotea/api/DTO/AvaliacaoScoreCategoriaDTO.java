package com.projetotea.api.DTO;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class AvaliacaoScoreCategoriaDTO {

    private Integer nivel;
    private String categoriaCodigo;
    private String categoriaNome;
    private BigDecimal mediaPercentual;
    private Integer itensPontuados;
    private Integer itensNaoObservados;
    private Integer totalItens;
}

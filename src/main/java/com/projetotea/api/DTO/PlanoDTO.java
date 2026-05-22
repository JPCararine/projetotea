package com.projetotea.api.DTO;

import jakarta.persistence.Column;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PlanoDTO {

    private Long id;

    private String nome;

    private BigDecimal preco;


    private Integer duracaoDias;
}

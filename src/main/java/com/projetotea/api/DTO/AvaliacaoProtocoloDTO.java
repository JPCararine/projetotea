package com.projetotea.api.DTO;

import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class AvaliacaoProtocoloDTO {

    private Long id;
    private String codigo;
    private String nome;
    private String versao;
    private String estruturaJson;
    private Boolean ativo;
    private OffsetDateTime criadoEm;
}

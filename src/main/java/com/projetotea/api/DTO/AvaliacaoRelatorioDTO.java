package com.projetotea.api.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AvaliacaoRelatorioDTO {

    private Long avaliacaoId;
    private Integer nivel;
    private List<AvaliacaoScoreCategoriaDTO> categorias;
}

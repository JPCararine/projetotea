package com.projetotea.api.DTO;

import com.projetotea.domain.model.RespostaAvaliacao;
import lombok.Data;

@Data
public class AvaliacaoRespostaDTO {

    private Long id;
    private Integer nivel;
    private String categoriaCodigo;
    private String categoriaNome;
    private String itemCodigo;
    private Integer itemNumero;
    private String competencia;
    private String descricao;
    private RespostaAvaliacao resposta;
    private Integer pontuacao;
}

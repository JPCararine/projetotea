package com.projetotea.api.DTO;

import com.projetotea.domain.model.RespostaAvaliacao;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AvaliacaoRespostaInputDTO {

    @NotNull
    private Integer nivel;

    @NotBlank
    private String categoriaCodigo;

    @NotBlank
    private String categoriaNome;

    @NotBlank
    private String itemCodigo;

    @NotNull
    private Integer itemNumero;

    @NotBlank
    private String competencia;

    private String descricao;

    @NotNull
    private RespostaAvaliacao resposta;
}

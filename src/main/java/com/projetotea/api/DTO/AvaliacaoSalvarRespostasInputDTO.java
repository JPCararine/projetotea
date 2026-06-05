package com.projetotea.api.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class AvaliacaoSalvarRespostasInputDTO {

    @Valid
    @NotEmpty
    private List<AvaliacaoRespostaInputDTO> respostas;
}

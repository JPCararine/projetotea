package com.projetotea.api.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AvaliacaoCriarInputDTO {

    @NotNull
    private Long protocoloId;
}

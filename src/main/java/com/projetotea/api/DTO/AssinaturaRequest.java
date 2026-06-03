package com.projetotea.api.DTO;

import com.projetotea.domain.model.FormaPagamento;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AssinaturaRequest {

    @NotNull
    private Long planoId;
    @NotNull
    private FormaPagamento formaPagamento;
}

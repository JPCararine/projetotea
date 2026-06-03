package com.projetotea.api.DTO;

import com.projetotea.payment.domain.enums.StatusAssinatura;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class AssinaturaDTO {

    private Long id;

    private UsuarioResumo usuario;

    private OffsetDateTime dataInicio;

    private OffsetDateTime dataFim;

    private StatusAssinatura status;
}


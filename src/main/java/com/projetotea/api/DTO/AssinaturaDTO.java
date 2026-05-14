package com.projetotea.api.DTO;

import com.projetotea.domain.model.StatusAssinatura;
import jakarta.persistence.Column;
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


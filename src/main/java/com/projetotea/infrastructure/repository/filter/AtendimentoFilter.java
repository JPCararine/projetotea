package com.projetotea.infrastructure.repository.filter;

import com.projetotea.domain.model.StatusAtendimento;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.OffsetDateTime;
import java.util.List;

@Data
public class AtendimentoFilter {

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private OffsetDateTime dataCriacaoInicio;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private OffsetDateTime dataCriacaoFim;

    private List<StatusAtendimento> status;

    private List<Long> pacientesIds;

}

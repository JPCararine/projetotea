package com.projetotea.domain.service;

import com.projetotea.api.DTO.AtendimentoAgendadosDTO;
import com.projetotea.api.DTO.AtendimentoDTO;
import com.projetotea.domain.model.Atendimento;
import com.projetotea.infrastructure.repository.filter.AtendimentoFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AtendimentoQueryService {

    Page<AtendimentoAgendadosDTO> consultaAtendimentos(AtendimentoFilter filter, String timeOffSet, Pageable pageable);
}

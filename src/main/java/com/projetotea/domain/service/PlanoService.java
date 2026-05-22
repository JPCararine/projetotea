package com.projetotea.domain.service;

import com.projetotea.api.DTO.PlanoDTO;
import com.projetotea.api.assembler.PlanoDTOAssembler;
import com.projetotea.domain.model.Plano;
import com.projetotea.infrastructure.repository.PlanoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlanoService {

    private final PlanoRepository planoRepository;
    private final PlanoDTOAssembler planoDTOAssembler;

    public List<PlanoDTO> findAll() {
        return planoRepository.findByAtivoTrue().stream()
                .map(planoDTOAssembler::toDTO)
                .toList();
    }
}

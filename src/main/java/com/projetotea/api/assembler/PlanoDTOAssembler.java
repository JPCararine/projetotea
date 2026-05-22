package com.projetotea.api.assembler;

import com.projetotea.api.DTO.PlanoDTO;
import com.projetotea.domain.model.Plano;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PlanoDTOAssembler {

    @Autowired
    private ModelMapper modelMapper;

    public PlanoDTO toDTO(Plano plano) {
        return modelMapper.map(plano, PlanoDTO.class);
    }
}

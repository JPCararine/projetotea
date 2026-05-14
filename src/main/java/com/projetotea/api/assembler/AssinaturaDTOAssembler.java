package com.projetotea.api.assembler;

import com.projetotea.api.DTO.AssinaturaDTO;
import com.projetotea.domain.model.Assinatura;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AssinaturaDTOAssembler {

    @Autowired
    private ModelMapper modelMapper;

    public AssinaturaDTO toDTO(Assinatura assinatura) {
        return modelMapper.map(assinatura, AssinaturaDTO.class);
    }
}

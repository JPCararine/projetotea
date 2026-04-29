package com.projetotea.api.assembler;

import com.projetotea.api.DTO.AtendimentoInputDTO;
import com.projetotea.domain.model.Atendimento;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AtendimentoDTODisassembler {
    @Autowired
    private ModelMapper modelMapper;

    public Atendimento toEntity(AtendimentoInputDTO atendimentoInputDTO) {
        return modelMapper.map(atendimentoInputDTO, Atendimento.class);
    }

}

package com.projetotea.api.assembler;

import com.projetotea.api.DTO.AvaliacaoProtocoloDTO;
import com.projetotea.domain.model.AvaliacaoProtocolo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AvaliacaoProtocoloDTOAssembler {

    private final ModelMapper modelMapper;

    public AvaliacaoProtocoloDTO toDTO(AvaliacaoProtocolo protocolo) {
        return modelMapper.map(protocolo, AvaliacaoProtocoloDTO.class);
    }
}

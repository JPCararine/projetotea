package com.projetotea.api.assembler;

import com.projetotea.api.DTO.AvaliacaoProtocoloInputDTO;
import com.projetotea.domain.model.AvaliacaoProtocolo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AvaliacaoProtocoloDTODisassembler {

    private final ModelMapper modelMapper;

    public AvaliacaoProtocolo toEntity(AvaliacaoProtocoloInputDTO inputDTO) {
        return modelMapper.map(inputDTO, AvaliacaoProtocolo.class);
    }

    public void copyToDomainObject(AvaliacaoProtocoloInputDTO inputDTO, AvaliacaoProtocolo protocolo) {
        protocolo.setCodigo(inputDTO.getCodigo());
        protocolo.setNome(inputDTO.getNome());
        protocolo.setVersao(inputDTO.getVersao());
        protocolo.setEstruturaJson(inputDTO.getEstruturaJson());
        protocolo.setAtivo(inputDTO.getAtivo());
    }
}

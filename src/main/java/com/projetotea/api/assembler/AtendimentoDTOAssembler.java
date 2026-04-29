package com.projetotea.api.assembler;

import com.projetotea.api.DTO.AtendimentoFiltroDTO;
import com.projetotea.api.DTO.AtendimentoResponseDTO;
import com.projetotea.domain.model.Atendimento;
import com.projetotea.domain.model.Usuario;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AtendimentoDTOAssembler {

    @Autowired
    private ModelMapper modelMapper;

    public AtendimentoFiltroDTO toDTO(Atendimento atendimento) {
        return modelMapper.map(atendimento, AtendimentoFiltroDTO.class);
    }
    public AtendimentoResponseDTO toResponseDTO(Atendimento atendimento) {
        AtendimentoResponseDTO dto = modelMapper.map(atendimento, AtendimentoResponseDTO.class);

        dto.setNomesUsuarios(
                atendimento.getUsuarios().stream()
                        .map(Usuario::getNome)
                        .toList()
        );

        return dto;
    }
}

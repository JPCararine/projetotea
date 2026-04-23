package com.projetotea.api.assembler;

import com.projetotea.api.DTO.PacienteDTO;
import com.projetotea.domain.model.Paciente;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PacienteDTOAssembler {
    @Autowired
    private ModelMapper modelMapper;

    public PacienteDTO toDTO(Paciente paciente) {
        return modelMapper.map(paciente, PacienteDTO.class);
    }

}

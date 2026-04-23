package com.projetotea.api.assembler;

import ch.qos.logback.classic.joran.ModelClassToModelHandlerLinker;
import com.projetotea.api.DTO.PacienteInputDTO;
import com.projetotea.domain.model.Paciente;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.ui.ModelMap;

@Component
public class PacienteDTODisassembler {
    @Autowired
    private ModelMapper modelMapper;

    public Paciente toEntity(PacienteInputDTO pacienteInputDTO) {
        return modelMapper.map(pacienteInputDTO, Paciente.class);
    }
}

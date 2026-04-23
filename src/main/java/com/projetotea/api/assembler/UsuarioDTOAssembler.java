package com.projetotea.api.assembler;

import com.projetotea.api.DTO.UsuarioDTO;
import com.projetotea.api.DTO.UsuarioIdNomeEmail;
import com.projetotea.domain.model.Usuario;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UsuarioDTOAssembler {

    @Autowired
    private ModelMapper modelMapper;

    public UsuarioDTO toDTO(Usuario usuario) {
        return modelMapper.map(usuario, UsuarioDTO.class);
    }
    public UsuarioIdNomeEmail toIdNomeEmailDTO(Usuario usuario) {
        return modelMapper.map(usuario, UsuarioIdNomeEmail.class);
    }
}

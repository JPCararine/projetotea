package com.projetotea.api.assembler;

import com.projetotea.api.DTO.UsuarioInputDTO;
import com.projetotea.domain.model.Usuario;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UsuarioDTODisassembler {

    @Autowired
    private ModelMapper modelMapper;

    public Usuario toEntity(UsuarioInputDTO usuarioInputDTO) {
        return modelMapper.map(usuarioInputDTO, Usuario.class);
    }

    public void copyToEntity(UsuarioInputDTO usuarioInputDTO, Usuario usuario) {
        modelMapper.map(usuarioInputDTO, usuario);
    }
}

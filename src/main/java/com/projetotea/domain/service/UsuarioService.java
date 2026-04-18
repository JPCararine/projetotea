package com.projetotea.domain.service;

import com.projetotea.api.DTO.UsuarioDTO;
import com.projetotea.api.DTO.UsuarioInputDTO;
import com.projetotea.api.assembler.UsuarioDTOAssembler;
import com.projetotea.api.assembler.UsuarioDTODisassembler;
import com.projetotea.domain.exception.UsuarioNotFoundException;
import com.projetotea.domain.model.Usuario;
import com.projetotea.infrastructure.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private UsuarioRepository usuarioRepository;
    private UsuarioDTOAssembler usuarioDTOAssembler;
    private UsuarioDTODisassembler usuarioDTODisassembler;

    public List<UsuarioDTO> findAll() {
        return usuarioRepository.findAll()
                .stream()
                .map(usuarioDTOAssembler::toDTO)
                .toList();
    }

    public UsuarioDTO findById(Long id) {
        Usuario usuario = buscarUsuarioOuFalhar(id);
        return usuarioDTOAssembler.toDTO(usuario);
    }

    public UsuarioDTO create(UsuarioInputDTO usuarioInputDTO) {

    }

    public Usuario buscarUsuarioOuFalhar(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNotFoundException());

    }
}

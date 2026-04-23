package com.projetotea.domain.service;

import com.projetotea.api.DTO.UsuarioDTO;
import com.projetotea.api.DTO.UsuarioIdNomeEmail;
import com.projetotea.api.DTO.UsuarioInputDTO;
import com.projetotea.api.assembler.UsuarioDTOAssembler;
import com.projetotea.api.assembler.UsuarioDTODisassembler;
import com.projetotea.domain.exception.EmailJaExistente;
import com.projetotea.domain.exception.UsuarioNotFoundException;
import com.projetotea.domain.model.Usuario;
import com.projetotea.infrastructure.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioDTOAssembler usuarioDTOAssembler;
    private final UsuarioDTODisassembler usuarioDTODisassembler;
    private final PasswordEncoder passwordEncoder;

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

    public UsuarioIdNomeEmail create(UsuarioInputDTO usuarioInputDTO) {
        checarEmail(usuarioInputDTO.getEmail(), null);
        Usuario usuario = usuarioDTODisassembler.toEntity(usuarioInputDTO);

        usuario.setSenha(passwordEncoder.encode(usuarioInputDTO.getSenha()));

        return usuarioDTOAssembler.toIdNomeEmailDTO(usuarioRepository.save(usuario));

    }

    public Usuario buscarUsuarioOuFalhar(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNotFoundException());

    }

    public void checarEmail(String email, Long id) {
        usuarioRepository.findByEmail(email)
                .ifPresent(usuario -> {
                    if (!usuario.getId().equals(id)) {
                        throw new EmailJaExistente();
                    }

                });

    }
}

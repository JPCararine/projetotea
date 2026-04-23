package com.projetotea.domain.service;

import com.projetotea.api.DTO.PacienteDTO;
import com.projetotea.api.DTO.PacienteInputDTO;
import com.projetotea.api.DTO.UsuarioDTO;
import com.projetotea.api.assembler.PacienteDTOAssembler;
import com.projetotea.api.assembler.PacienteDTODisassembler;
import com.projetotea.domain.exception.UsuarioNotFoundException;
import com.projetotea.domain.model.Paciente;
import com.projetotea.domain.model.Usuario;
import com.projetotea.infrastructure.repository.PacienteRepository;
import com.projetotea.infrastructure.repository.UsuarioPacienteRepository;
import com.projetotea.infrastructure.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioPacienteService {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioPacienteRepository usuarioPacienteRepository;
    private final PacienteDTOAssembler pacienteDTOAssembler;
    private final PacienteDTODisassembler pacienteDTODisassembler;


    public List<PacienteDTO> findAll(Long usuarioId) {
     Usuario usuario = buscarUsuarioOuFalhar(usuarioId);
        return usuarioPacienteRepository.findPacientesByUsuarioId(usuario.getId())
                .stream()
                .map(pacienteDTOAssembler::toDTO)
                .toList();
    }
//    @Transactional
//    public PacienteDTO cadastroPaciente(PacienteInputDTO pacienteInputDTO) {
//        Usuario usuario = buscarUsuarioOuFalhar(pacienteInputDTO.get)
//
//        Paciente paciente = pacienteDTODisassembler.toEntity(pacienteInputDTO);
//
//        paciente.setUsuario();
//    }

    public Usuario buscarUsuarioOuFalhar(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNotFoundException());

    }




}

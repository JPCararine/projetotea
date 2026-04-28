package com.projetotea.domain.service;

import com.projetotea.api.DTO.PacienteDTO;
import com.projetotea.api.DTO.PacienteInputDTO;
import com.projetotea.api.DTO.UsuarioDTO;
import com.projetotea.api.assembler.PacienteDTOAssembler;
import com.projetotea.api.assembler.PacienteDTODisassembler;
import com.projetotea.core.security.TeaSecurity;
import com.projetotea.domain.exception.JaVinculado;
import com.projetotea.domain.exception.PacienteNotFoundException;
import com.projetotea.domain.exception.UsuarioNotFoundException;
import com.projetotea.domain.model.Paciente;
import com.projetotea.domain.model.TipoRelacao;
import com.projetotea.domain.model.Usuario;
import com.projetotea.domain.model.UsuarioPaciente;
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
    private final TeaSecurity teaSecurity;
    private final PacienteRepository pacienteRepository;


    public List<PacienteDTO> findAll() {
     Long usuarioId = teaSecurity.getUsuarioId();
        return usuarioPacienteRepository.findPacientesByUsuarioId(usuarioId)
                .stream()
                .map(pacienteDTOAssembler::toDTO)
                .toList();
    }
    @Transactional
    public PacienteDTO cadastroPaciente(PacienteInputDTO pacienteInputDTO) {
        Usuario usuario = buscarUsuarioOuFalhar(teaSecurity.getUsuarioId());



        Paciente paciente = pacienteRepository
                .findByCpf(pacienteInputDTO.getCpf())
                .orElseGet(() -> {
                    Paciente novo = pacienteDTODisassembler.toEntity(pacienteInputDTO);
                    return pacienteRepository.save(novo);
                });
        
        vincularPaciente(usuario, paciente);

        return pacienteDTOAssembler.toDTO(paciente);
    }

    public Usuario buscarUsuarioOuFalhar(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNotFoundException());

    }
    @Transactional
    public void vincularPaciente(Usuario usuario, Paciente paciente) {

        boolean jaExiste = usuarioPacienteRepository.existsByUsuarioIdAndPacienteId(usuario.getId(), paciente.getId());

        if(jaExiste) {
            throw new JaVinculado();
        }
        UsuarioPaciente usuarioPaciente = UsuarioPaciente.builder()
                .usuario(usuario)
                .paciente(paciente)
                .tipoRelacao(TipoRelacao.valueOf(usuario.getCategoria().name()))
                .build();

        usuarioPacienteRepository.save(usuarioPaciente);
    }




}

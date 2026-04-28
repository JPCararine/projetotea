package com.projetotea.domain.service;

import com.projetotea.api.DTO.PacienteDTO;
import com.projetotea.api.DTO.PacienteInputDTO;
import com.projetotea.api.DTO.UsuarioDTO;
import com.projetotea.api.assembler.PacienteDTOAssembler;
import com.projetotea.api.assembler.PacienteDTODisassembler;
import com.projetotea.core.security.TeaSecurity;
import com.projetotea.domain.exception.JaVinculado;
import com.projetotea.domain.exception.NegocioException;
import com.projetotea.domain.exception.PacienteNotFoundException;
import com.projetotea.domain.exception.UsuarioNotFoundException;
import com.projetotea.domain.model.*;
import com.projetotea.infrastructure.repository.PacienteRepository;
import com.projetotea.infrastructure.repository.UsuarioPacienteRepository;
import com.projetotea.infrastructure.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import java.util.List;

import static com.projetotea.domain.model.CategoriaUsuario.PROFISSIONAL;

@Service
@RequiredArgsConstructor
public class UsuarioPacienteService {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioPacienteRepository usuarioPacienteRepository;
    private final PacienteDTOAssembler pacienteDTOAssembler;
    private final PacienteDTODisassembler pacienteDTODisassembler;
    private final TeaSecurity teaSecurity;
    private final PacienteRepository pacienteRepository;


    public Page<PacienteDTO> findAll(Pageable pageable) {
     Long usuarioId = teaSecurity.getUsuarioId();
        Page<Paciente> pacientes =  usuarioPacienteRepository.findPacientesByUsuarioId(usuarioId, pageable);

        return pacientes.map(pacienteDTOAssembler::toDTO);

    }
    @Transactional
    public PacienteDTO cadastroPaciente(PacienteInputDTO pacienteInputDTO) {
        Usuario usuario = buscarUsuarioOuFalhar(teaSecurity.getUsuarioId());

        if (pacienteInputDTO.getCpf() == null || pacienteInputDTO.getCpf().isBlank()) {
            throw new NegocioException("CPF obrigatório para cadastro de paciente");
        }

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
        TipoRelacao tipoRelacao = mapearTipoRelacao(usuario.getCategoria());
        UsuarioPaciente usuarioPaciente = UsuarioPaciente.builder()
                .usuario(usuario)
                .paciente(paciente)
                .tipoRelacao(tipoRelacao)
                .build();
        try {
            usuarioPacienteRepository.save(usuarioPaciente);
        } catch(DataIntegrityViolationException e) {
            throw new JaVinculado();
        }

    }
    private TipoRelacao mapearTipoRelacao(CategoriaUsuario categoria) {
        return switch (categoria) {
            case FAMILIAR -> TipoRelacao.FAMILIAR;
            case PROFISSIONAL -> TipoRelacao.PROFISSIONAL;
            case ADMIN -> throw new NegocioException("ADMIN não pode ser vinculado a paciente");
        };
    }




}

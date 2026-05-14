package com.projetotea.domain.service;

import com.projetotea.api.DTO.PacienteDTO;
import com.projetotea.api.DTO.PacienteInputDTO;
import com.projetotea.api.assembler.PacienteDTOAssembler;
import com.projetotea.api.assembler.PacienteDTODisassembler;
import com.projetotea.core.security.TeaSecurity;
import com.projetotea.domain.exception.NegocioException;
import com.projetotea.domain.model.Paciente;
import com.projetotea.domain.model.Usuario;
import com.projetotea.infrastructure.repository.PacienteRepository;
import com.projetotea.infrastructure.repository.UsuarioPacienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PacienteService {

    private final UsuarioPacienteRepository usuarioPacienteRepository;
    private final PacienteRepository pacienteRepository;
    private final PacienteDTODisassembler disassembler;
    private final TeaSecurity teaSecurity;
    private final PacienteDTOAssembler assembler;

    public Page<PacienteDTO> findAll(Pageable pageable) {
        Long usuarioLogado = teaSecurity.getUsuarioId();
        return usuarioPacienteRepository
                .findPacientesByUsuarioId(usuarioLogado, pageable)
                .map(assembler::toDTO);
    }

    public Paciente buscarOuCriar(PacienteInputDTO inputDTO) {
        validarCpf(inputDTO.getCpf());

        return pacienteRepository.findByCpf(inputDTO.getCpf())
                .orElseGet(() -> pacienteRepository.save(disassembler.toEntity(inputDTO)));
    }

    public void validarCpf(String cpf) {
        if(cpf == null || cpf.isBlank()) {
            throw new NegocioException("CPF é obrigatório para cadastro de pacientes");
        }
    }
}

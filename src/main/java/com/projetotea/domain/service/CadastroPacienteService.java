package com.projetotea.domain.service;

import com.projetotea.api.DTO.PacienteDTO;
import com.projetotea.api.DTO.PacienteInputDTO;
import com.projetotea.api.assembler.PacienteDTOAssembler;
import com.projetotea.core.security.TeaSecurity;
import com.projetotea.domain.model.Paciente;
import com.projetotea.domain.model.Usuario;
import com.projetotea.payment.domain.service.AssinaturaValidationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CadastroPacienteService {

    private final UsuarioService usuarioService;
    private final PacienteService pacienteService;
    private final VinculoService vinculoService;
    private final AssinaturaValidationService assinatura;
    private final TeaSecurity teaSecurity;
    private final PacienteDTOAssembler assembler;

    @Transactional
    public PacienteDTO cadastroPaciente(PacienteInputDTO inputDTO) {
        Usuario usuario = usuarioService.buscarUsuarioOuFalhar(teaSecurity.getUsuarioId());

        assinatura.validarCadastroPaciente(usuario);

        Paciente paciente = pacienteService.buscarOuCriar(inputDTO);

        vinculoService.vincularPaciente(usuario, paciente);

        return assembler.toDTO(paciente);
    }
}

package com.projetotea.domain.service;

import com.projetotea.domain.exception.JaVinculado;
import com.projetotea.domain.exception.NegocioException;
import com.projetotea.domain.model.*;
import com.projetotea.infrastructure.repository.UsuarioPacienteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VinculoService {

    private final UsuarioPacienteRepository usuarioPacienteRepository;

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

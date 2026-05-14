package com.projetotea.domain.service;

import com.projetotea.api.DTO.PacienteInputDTO;
import com.projetotea.domain.exception.NegocioException;
import com.projetotea.domain.model.Assinatura;
import com.projetotea.domain.model.CategoriaUsuario;
import com.projetotea.domain.model.StatusAssinatura;
import com.projetotea.domain.model.Usuario;
import com.projetotea.infrastructure.repository.AssinaturaRepository;
import com.projetotea.infrastructure.repository.UsuarioPacienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssinaturaValidationService {

    private final AssinaturaRepository assinaturaRepository;
    private final UsuarioPacienteRepository usuarioPacienteRepository;

    public void validarAssinatura(Usuario usuario) {

        Assinatura assinatura = assinaturaRepository.findByUsuarioIdAndStatus(usuario.getId(), StatusAssinatura.ATIVA)
                .orElse(null);

        if(assinatura != null) {
            return;
        }


        long total = usuarioPacienteRepository.countByUsuarioId(usuario.getId());

        if(total >= 3) {
                throw new NegocioException("Você atingiu o limite de cadastros no plano gratuito.");
            }
        }
    }


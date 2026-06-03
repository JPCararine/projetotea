package com.projetotea.payment.domain.service;

import com.projetotea.domain.exception.NegocioException;
import com.projetotea.payment.domain.enums.StatusAssinatura;
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

        boolean assinaturaAtiva = assinaturaRepository.existsByUsuarioIdAndStatus(
                usuario.getId(), StatusAssinatura.ATIVA);

        if(assinaturaAtiva) {
            return;
        }


        long total = usuarioPacienteRepository.countByUsuarioId(usuario.getId());

        if(total >= 3) {
                throw new NegocioException("Você atingiu o limite de cadastros no plano gratuito.");
            }
        }
    }


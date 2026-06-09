package com.projetotea.payment.domain.service;

import com.projetotea.domain.exception.NegocioException;
import com.projetotea.payment.domain.enums.StatusAssinatura;
import com.projetotea.domain.model.Usuario;
import com.projetotea.payment.domain.repository.AssinaturaRepository;
import com.projetotea.infrastructure.repository.UsuarioPacienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssinaturaValidationService {

    private final AssinaturaRepository assinaturaRepository;
    private final UsuarioPacienteRepository usuarioPacienteRepository;

    public void validarCadastroPaciente(Usuario usuario) {

        if(possuiAssinaturaComAcesso(usuario.getId())) {
            return;
        }

        long total = usuarioPacienteRepository.countByUsuarioId(usuario.getId());

        if(total >= 3) {
                throw new NegocioException("Você atingiu o limite de cadastros no plano gratuito.");
            }
        }
    public void validarCriacaoAtendimento(Usuario usuario) {

        if(possuiAssinaturaComAcesso(usuario.getId())) {
            return;
        }

        throw new NegocioException("Você precisa de uma assinatura ativa para criar atendimentos.");
    }
    public void validarCriacaoAvaliacao(Usuario usuario) {
        if(possuiAssinaturaComAcesso(usuario.getId())) {
            return;
        }

        throw new NegocioException("Você precisa de uma assinatura ativa para criar avaliações.");
    }
    private boolean possuiAssinaturaComAcesso(Long usuarioId) {
        return assinaturaRepository.existsByUsuarioIdAndStatusIn(
                usuarioId,
                List.of(
                        StatusAssinatura.ATIVA,
                        StatusAssinatura.EM_ATRASO,
                        StatusAssinatura.CANCELAMENTO_SOLICITADO
                )
        );
    }
}


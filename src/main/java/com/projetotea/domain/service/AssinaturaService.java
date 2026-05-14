package com.projetotea.domain.service;

import com.projetotea.api.DTO.AssinaturaDTO;
import com.projetotea.api.assembler.AssinaturaDTOAssembler;
import com.projetotea.core.security.TeaSecurity;
import com.projetotea.domain.exception.AssinaturaNotFoundException;
import com.projetotea.domain.exception.NegocioException;
import com.projetotea.domain.exception.PlanoNotFoundException;
import com.projetotea.domain.exception.UsuarioNotFoundException;
import com.projetotea.domain.model.Assinatura;
import com.projetotea.domain.model.Plano;
import com.projetotea.domain.model.StatusAssinatura;
import com.projetotea.domain.model.Usuario;
import com.projetotea.infrastructure.repository.AssinaturaRepository;
import com.projetotea.infrastructure.repository.PlanoRepository;
import com.projetotea.infrastructure.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssinaturaService {

    private final AssinaturaRepository assinaturaRepository;
    private final PlanoRepository planoRepository;
    private final TeaSecurity teaSecurity;
    private final UsuarioRepository usuarioRepository;
    private final AssinaturaDTOAssembler assembler;

    public List<AssinaturaDTO> listAll() {
        Long usuarioId = teaSecurity.getUsuarioId();

        return assinaturaRepository.findByUsuarioId(usuarioId).stream()
                .map(assembler::toDTO)
                .toList();
    }

    public AssinaturaDTO criar(Long planoId) {
        Long usuarioId = teaSecurity.getUsuarioId();

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new UsuarioNotFoundException());

        Plano plano = planoRepository.findById(planoId)
                .orElseThrow(() -> new PlanoNotFoundException());

        OffsetDateTime now = OffsetDateTime.now();

        Assinatura assinaturaAtiva = assinaturaRepository.findByUsuarioIdAndStatus(usuarioId, StatusAssinatura.ATIVA)
                .orElse(null);

        if (assinaturaAtiva != null && assinaturaAtiva.getPlano().getId().equals(plano.getId())) {
            throw new NegocioException("Você já possui esse plano ativo");
        }


        Assinatura assinatura = Assinatura.builder()
                .usuario(usuario)
                .plano(plano)
                .status(StatusAssinatura.ATIVA)
                .dataInicio(now)
                .dataFim(now.plusDays(plano.getDuracaoDias()))
                .build();

        return assembler.toDTO(assinaturaRepository.save(assinatura));
    }

    public Assinatura cancelar() {

        Long usuarioId = teaSecurity.getUsuarioId();

        Assinatura assinatura = assinaturaRepository.findByUsuarioIdAndStatus(usuarioId, StatusAssinatura.ATIVA)
                .orElseThrow(() -> new AssinaturaNotFoundException());


        assinatura.setStatus(StatusAssinatura.CANCELADA);

        return assinaturaRepository.save(assinatura);
    }



}

package com.projetotea.core;

import com.projetotea.domain.model.AvaliacaoProtocolo;
import com.projetotea.infrastructure.repository.AvaliacaoProtocoloRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class AvaliacaoProtocoloSeed implements ApplicationRunner {

    private static final String ESDM_CODIGO = "ESDM";
    private static final String ESDM_VERSAO = "1.0";

    private final AvaliacaoProtocoloRepository avaliacaoProtocoloRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (avaliacaoProtocoloRepository.findByCodigoAndVersao(ESDM_CODIGO, ESDM_VERSAO).isPresent()) {
            return;
        }

        ClassPathResource resource = new ClassPathResource("protocolos/esdm.json");
        String estruturaJson = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);

        AvaliacaoProtocolo protocolo = new AvaliacaoProtocolo();
        protocolo.setCodigo(ESDM_CODIGO);
        protocolo.setNome("Modelo Denver de Intervenção Precoce");
        protocolo.setVersao(ESDM_VERSAO);
        protocolo.setEstruturaJson(estruturaJson);
        protocolo.setAtivo(true);

        avaliacaoProtocoloRepository.save(protocolo);
    }
}

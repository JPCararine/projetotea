package com.projetotea.api.assembler;

import com.projetotea.api.DTO.AvaliacaoRespostaInputDTO;
import com.projetotea.domain.model.AvaliacaoResposta;
import com.projetotea.domain.model.RespostaAvaliacao;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AvaliacaoRespostaDTODisassembler {

    private final ModelMapper modelMapper;

    public AvaliacaoResposta toEntity(AvaliacaoRespostaInputDTO inputDTO) {
        AvaliacaoResposta resposta = modelMapper.map(inputDTO, AvaliacaoResposta.class);
        resposta.setPontuacao(toPontuacao(inputDTO.getResposta()));
        return resposta;
    }

    private Integer toPontuacao(RespostaAvaliacao resposta) {
        return switch (resposta) {
            case NAO_DEMONSTRA -> 0;
            case PARCIAL -> 50;
            case ADQUIRIDO -> 100;
            case NAO_OBSERVADO -> null;
        };
    }
}

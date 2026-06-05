package com.projetotea.api.assembler;

import com.projetotea.api.DTO.AvaliacaoDTO;
import com.projetotea.api.DTO.AvaliacaoRespostaDTO;
import com.projetotea.api.DTO.AvaliacaoScoreCategoriaDTO;
import com.projetotea.domain.model.Avaliacao;
import com.projetotea.domain.model.AvaliacaoResposta;
import com.projetotea.domain.model.AvaliacaoScoreCategoria;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AvaliacaoDTOAssembler {

    private final ModelMapper modelMapper;

    public AvaliacaoDTO toDTO(Avaliacao avaliacao) {
        AvaliacaoDTO dto = toResumoDTO(avaliacao);

        if (avaliacao.getRespostas() != null) {
            dto.setRespostas(avaliacao.getRespostas().stream().map(this::toRespostaDTO).toList());
        }
        if (avaliacao.getScores() != null) {
            dto.setScores(avaliacao.getScores().stream().map(this::toScoreDTO).toList());
        }

        return dto;
    }

    public AvaliacaoDTO toResumoDTO(Avaliacao avaliacao) {
        AvaliacaoDTO dto = new AvaliacaoDTO();
        dto.setId(avaliacao.getId());
        dto.setCodigo(avaliacao.getCodigo());
        dto.setPacienteId(avaliacao.getPaciente().getId());
        dto.setPacienteNome(avaliacao.getPaciente().getNome());
        dto.setProtocoloId(avaliacao.getProtocolo().getId());
        dto.setProtocoloCodigo(avaliacao.getProtocoloCodigo());
        dto.setProtocoloNome(avaliacao.getProtocoloNome());
        dto.setProtocoloVersao(avaliacao.getProtocoloVersao());
        dto.setCriadoPorId(avaliacao.getCriadoPor().getId());
        dto.setCriadoPorNome(avaliacao.getCriadoPor().getNome());
        dto.setStatus(avaliacao.getStatus());
        dto.setCriadoEm(avaliacao.getCriadoEm());
        dto.setFinalizadoEm(avaliacao.getFinalizadoEm());
        return dto;
    }

    public AvaliacaoRespostaDTO toRespostaDTO(AvaliacaoResposta resposta) {
        return modelMapper.map(resposta, AvaliacaoRespostaDTO.class);
    }

    public AvaliacaoScoreCategoriaDTO toScoreDTO(AvaliacaoScoreCategoria score) {
        return modelMapper.map(score, AvaliacaoScoreCategoriaDTO.class);
    }
}

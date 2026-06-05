package com.projetotea.api.DTO;

import com.projetotea.domain.model.StatusAvaliacao;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.List;

@Data
public class AvaliacaoDTO {

    private Long id;
    private String codigo;
    private Long pacienteId;
    private String pacienteNome;
    private Long protocoloId;
    private String protocoloCodigo;
    private String protocoloNome;
    private String protocoloVersao;
    private Long criadoPorId;
    private String criadoPorNome;
    private StatusAvaliacao status;
    private OffsetDateTime criadoEm;
    private OffsetDateTime finalizadoEm;
    private List<AvaliacaoRespostaDTO> respostas;
    private List<AvaliacaoScoreCategoriaDTO> scores;
}

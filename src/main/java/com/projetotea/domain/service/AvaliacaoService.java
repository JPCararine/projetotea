package com.projetotea.domain.service;

import com.projetotea.api.DTO.AvaliacaoCriarInputDTO;
import com.projetotea.api.DTO.AvaliacaoDTO;
import com.projetotea.api.DTO.AvaliacaoRelatorioDTO;
import com.projetotea.api.DTO.AvaliacaoSalvarRespostasInputDTO;
import com.projetotea.api.assembler.AvaliacaoDTOAssembler;
import com.projetotea.api.assembler.AvaliacaoRespostaDTODisassembler;
import com.projetotea.core.security.TeaSecurity;
import com.projetotea.domain.exception.AvaliacaoNotFoundException;
import com.projetotea.domain.exception.AvaliacaoProtocoloNotFoundException;
import com.projetotea.domain.exception.NegocioException;
import com.projetotea.domain.exception.PacienteNotFoundException;
import com.projetotea.domain.exception.UsuarioNotFoundException;
import com.projetotea.domain.model.Avaliacao;
import com.projetotea.domain.model.AvaliacaoProtocolo;
import com.projetotea.domain.model.AvaliacaoResposta;
import com.projetotea.domain.model.AvaliacaoScoreCategoria;
import com.projetotea.domain.model.Paciente;
import com.projetotea.domain.model.RespostaAvaliacao;
import com.projetotea.domain.model.StatusAvaliacao;
import com.projetotea.domain.model.Usuario;
import com.projetotea.infrastructure.repository.AvaliacaoProtocoloRepository;
import com.projetotea.infrastructure.repository.AvaliacaoRepository;
import com.projetotea.infrastructure.repository.AvaliacaoScoreCategoriaRepository;
import com.projetotea.infrastructure.repository.PacienteRepository;
import com.projetotea.infrastructure.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AvaliacaoService {

    private final AvaliacaoRepository avaliacaoRepository;
    private final AvaliacaoProtocoloRepository avaliacaoProtocoloRepository;
    private final AvaliacaoScoreCategoriaRepository avaliacaoScoreCategoriaRepository;
    private final PacienteRepository pacienteRepository;
    private final UsuarioRepository usuarioRepository;
    private final TeaSecurity teaSecurity;
    private final AvaliacaoDTOAssembler avaliacaoDTOAssembler;
    private final AvaliacaoRespostaDTODisassembler avaliacaoRespostaDTODisassembler;

    public List<AvaliacaoDTO> listarPorPaciente(Long pacienteId) {
        checarVinculoPaciente(pacienteId);
        return avaliacaoRepository.findByPacienteIdOrderByCriadoEmDesc(pacienteId)
                .stream()
                .map(avaliacaoDTOAssembler::toResumoDTO)
                .toList();
    }

    public AvaliacaoDTO buscar(Long avaliacaoId) {
        Avaliacao avaliacao = findWithDetailsOrFail(avaliacaoId);
        checarVinculoPaciente(avaliacao.getPaciente().getId());
        return avaliacaoDTOAssembler.toDTO(avaliacao);
    }

    @Transactional
    public AvaliacaoDTO criar(Long pacienteId, AvaliacaoCriarInputDTO inputDTO) {
        checarVinculoPaciente(pacienteId);

        Paciente paciente = pacienteRepository.findById(pacienteId)
                .orElseThrow(PacienteNotFoundException::new);
        Usuario usuario = usuarioRepository.findById(teaSecurity.getUsuarioId())
                .orElseThrow(UsuarioNotFoundException::new);
        AvaliacaoProtocolo protocolo = avaliacaoProtocoloRepository.findById(inputDTO.getProtocoloId())
                .orElseThrow(() -> new AvaliacaoProtocoloNotFoundException(inputDTO.getProtocoloId()));

        if (Boolean.FALSE.equals(protocolo.getAtivo())) {
            throw new NegocioException("Protocolo de avaliação inativo.");
        }

        Avaliacao avaliacao = new Avaliacao();
        avaliacao.setPaciente(paciente);
        avaliacao.setProtocolo(protocolo);
        avaliacao.setProtocoloCodigo(protocolo.getCodigo());
        avaliacao.setProtocoloNome(protocolo.getNome());
        avaliacao.setProtocoloVersao(protocolo.getVersao());
        avaliacao.setCriadoPor(usuario);
        avaliacao.setStatus(StatusAvaliacao.RASCUNHO);

        return avaliacaoDTOAssembler.toDTO(avaliacaoRepository.save(avaliacao));
    }

    @Transactional
    public AvaliacaoDTO salvarRespostas(Long avaliacaoId, AvaliacaoSalvarRespostasInputDTO inputDTO) {
        Avaliacao avaliacao = findWithDetailsOrFail(avaliacaoId);
        checarVinculoPaciente(avaliacao.getPaciente().getId());

        if (avaliacao.getStatus() == StatusAvaliacao.CANCELADA) {
            throw new NegocioException("Avaliação cancelada nÃo pode ser alterada.");
        }

        avaliacao.getRespostas().clear();
        avaliacao.getScores().clear();

        inputDTO.getRespostas().forEach(respostaInput -> {
            AvaliacaoResposta resposta = avaliacaoRespostaDTODisassembler.toEntity(respostaInput);
            resposta.setAvaliacao(avaliacao);
            avaliacao.getRespostas().add(resposta);
        });

        calcularScores(avaliacao).forEach(score -> {
            score.setAvaliacao(avaliacao);
            avaliacao.getScores().add(score);
        });

        if (avaliacao.getStatus() == StatusAvaliacao.RASCUNHO) {
            avaliacao.setStatus(StatusAvaliacao.EM_ANDAMENTO);
        }

        return avaliacaoDTOAssembler.toDTO(avaliacao);
    }

    @Transactional
    public AvaliacaoDTO finalizar(Long avaliacaoId) {
        Avaliacao avaliacao = findWithDetailsOrFail(avaliacaoId);
        checarVinculoPaciente(avaliacao.getPaciente().getId());

        if (avaliacao.getRespostas().isEmpty()) {
            throw new NegocioException("Avaliação não pode ser finalizada sem respostas.");
        }

        avaliacao.setStatus(StatusAvaliacao.CONCLUIDA);
        avaliacao.setFinalizadoEm(OffsetDateTime.now());
        return avaliacaoDTOAssembler.toDTO(avaliacao);
    }

    public AvaliacaoRelatorioDTO buscarRelatorio(Long avaliacaoId, Integer nivel) {
        Avaliacao avaliacao = avaliacaoRepository.findById(avaliacaoId)
                .orElseThrow(() -> new AvaliacaoNotFoundException(avaliacaoId));
        checarVinculoPaciente(avaliacao.getPaciente().getId());

        List<AvaliacaoScoreCategoria> scores = nivel == null
                ? avaliacaoScoreCategoriaRepository.findByAvaliacaoIdAndNivelIsNullOrderByCategoriaCodigoAsc(avaliacaoId)
                : avaliacaoScoreCategoriaRepository.findByAvaliacaoIdAndNivelOrderByCategoriaCodigoAsc(avaliacaoId, nivel);

        return new AvaliacaoRelatorioDTO(
                avaliacaoId,
                nivel,
                scores.stream().map(avaliacaoDTOAssembler::toScoreDTO).toList()
        );
    }

    private List<AvaliacaoScoreCategoria> calcularScores(Avaliacao avaliacao) {
        Map<String, ScoreAccumulator> porNivel = new LinkedHashMap<>();
        Map<String, ScoreAccumulator> consolidado = new LinkedHashMap<>();

        avaliacao.getRespostas().forEach(resposta -> {
            String nivelKey = resposta.getNivel() + "|" + resposta.getCategoriaCodigo();
            porNivel.computeIfAbsent(nivelKey, key -> new ScoreAccumulator(
                    resposta.getNivel(), resposta.getCategoriaCodigo(), resposta.getCategoriaNome()
            )).add(resposta);

            consolidado.computeIfAbsent(resposta.getCategoriaCodigo(), key -> new ScoreAccumulator(
                    null, resposta.getCategoriaCodigo(), resposta.getCategoriaNome()
            )).add(resposta);
        });

        List<AvaliacaoScoreCategoria> scores = new ArrayList<>();
        porNivel.values().stream().map(ScoreAccumulator::toScore).forEach(scores::add);
        consolidado.values().stream().map(ScoreAccumulator::toScore).forEach(scores::add);
        return scores;
    }

    private Avaliacao findWithDetailsOrFail(Long avaliacaoId) {
        return avaliacaoRepository.findWithDetailsById(avaliacaoId)
                .orElseThrow(() -> new AvaliacaoNotFoundException(avaliacaoId));
    }

    private void checarVinculoPaciente(Long pacienteId) {
        if (!teaSecurity.vinculoComPaciente(pacienteId)) {
            throw new NegocioException("Usuário não possui vínculo com o paciente informado.");
        }
    }

    private static class ScoreAccumulator {
        private final Integer nivel;
        private final String categoriaCodigo;
        private final String categoriaNome;
        private int totalItens;
        private int itensNaoObservados;
        private final List<Integer> pontuacoes = new ArrayList<>();

        private ScoreAccumulator(Integer nivel, String categoriaCodigo, String categoriaNome) {
            this.nivel = nivel;
            this.categoriaCodigo = categoriaCodigo;
            this.categoriaNome = categoriaNome;
        }

        private void add(AvaliacaoResposta resposta) {
            totalItens++;
            if (resposta.getResposta() == RespostaAvaliacao.NAO_OBSERVADO) {
                itensNaoObservados++;
                return;
            }
            if (Objects.nonNull(resposta.getPontuacao())) {
                pontuacoes.add(resposta.getPontuacao());
            }
        }

        private AvaliacaoScoreCategoria toScore() {
            AvaliacaoScoreCategoria score = new AvaliacaoScoreCategoria();
            score.setNivel(nivel);
            score.setCategoriaCodigo(categoriaCodigo);
            score.setCategoriaNome(categoriaNome);
            score.setTotalItens(totalItens);
            score.setItensNaoObservados(itensNaoObservados);
            score.setItensPontuados(pontuacoes.size());
            score.setMediaPercentual(calcularMedia());
            return score;
        }

        private BigDecimal calcularMedia() {
            if (pontuacoes.isEmpty()) {
                return BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
            }
            int soma = pontuacoes.stream().mapToInt(Integer::intValue).sum();
            return BigDecimal.valueOf(soma)
                    .divide(BigDecimal.valueOf(pontuacoes.size()), 2, RoundingMode.HALF_UP);
        }
    }
}

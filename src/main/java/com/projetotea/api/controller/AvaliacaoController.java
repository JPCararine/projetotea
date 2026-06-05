package com.projetotea.api.controller;

import com.projetotea.api.DTO.AvaliacaoCriarInputDTO;
import com.projetotea.api.DTO.AvaliacaoDTO;
import com.projetotea.api.DTO.AvaliacaoRelatorioDTO;
import com.projetotea.api.DTO.AvaliacaoSalvarRespostasInputDTO;
import com.projetotea.core.security.CheckSecurity;
import com.projetotea.domain.service.AvaliacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AvaliacaoController {

    private final AvaliacaoService avaliacaoService;

    @GetMapping("pacientes/{pacienteId}/avaliacoes")
    @CheckSecurity.Avaliacao.PodeListar
    public ResponseEntity<List<AvaliacaoDTO>> listarPorPaciente(@PathVariable Long pacienteId) {
        return ResponseEntity.ok(avaliacaoService.listarPorPaciente(pacienteId));
    }

    @PostMapping("pacientes/{pacienteId}/avaliacoes")
    @CheckSecurity.Avaliacao.PodeCriar
    public ResponseEntity<AvaliacaoDTO> criar(
            @PathVariable Long pacienteId,
            @RequestBody @Valid AvaliacaoCriarInputDTO inputDTO
    ) {
        return new ResponseEntity<>(avaliacaoService.criar(pacienteId, inputDTO), HttpStatus.CREATED);
    }

    @GetMapping("avaliacoes/{avaliacaoId}")
    @CheckSecurity.Avaliacao.PodeListar
    public ResponseEntity<AvaliacaoDTO> buscar(@PathVariable Long avaliacaoId) {
        return ResponseEntity.ok(avaliacaoService.buscar(avaliacaoId));
    }

    @PutMapping("avaliacoes/{avaliacaoId}/respostas")
    @CheckSecurity.Avaliacao.PodeEditar
    public ResponseEntity<AvaliacaoDTO> salvarRespostas(
            @PathVariable Long avaliacaoId,
            @RequestBody @Valid AvaliacaoSalvarRespostasInputDTO inputDTO
    ) {
        return ResponseEntity.ok(avaliacaoService.salvarRespostas(avaliacaoId, inputDTO));
    }

    @PostMapping("avaliacoes/{avaliacaoId}/finalizar")
    @CheckSecurity.Avaliacao.PodeEditar
    public ResponseEntity<AvaliacaoDTO> finalizar(@PathVariable Long avaliacaoId) {
        return ResponseEntity.ok(avaliacaoService.finalizar(avaliacaoId));
    }

    @GetMapping("avaliacoes/{avaliacaoId}/relatorios")
    @CheckSecurity.Avaliacao.PodeListar
    public ResponseEntity<AvaliacaoRelatorioDTO> relatorio(
            @PathVariable Long avaliacaoId,
            @RequestParam(required = false) Integer nivel
    ) {
        return ResponseEntity.ok(avaliacaoService.buscarRelatorio(avaliacaoId, nivel));
    }
}

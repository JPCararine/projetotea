package com.projetotea.api.controller;

import com.projetotea.api.DTO.AvaliacaoProtocoloDTO;
import com.projetotea.api.DTO.AvaliacaoProtocoloInputDTO;
import com.projetotea.core.security.CheckSecurity;
import com.projetotea.domain.service.AvaliacaoProtocoloService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("protocolos-avaliacao")
@RequiredArgsConstructor
public class AvaliacaoProtocoloController {

    private final AvaliacaoProtocoloService avaliacaoProtocoloService;

    @GetMapping
    @CheckSecurity.AvaliacaoProtocolo.PodeListar
    public ResponseEntity<List<AvaliacaoProtocoloDTO>> listar() {
        return ResponseEntity.ok(avaliacaoProtocoloService.listarAtivos());
    }

    @GetMapping("/{protocoloId}")
    @CheckSecurity.AvaliacaoProtocolo.PodeListar
    public ResponseEntity<AvaliacaoProtocoloDTO> buscar(@PathVariable Long protocoloId) {
        return ResponseEntity.ok(avaliacaoProtocoloService.buscar(protocoloId));
    }

    @PostMapping
    @CheckSecurity.AvaliacaoProtocolo.PodeEditar
    public ResponseEntity<AvaliacaoProtocoloDTO> criar(@RequestBody @Valid AvaliacaoProtocoloInputDTO inputDTO) {
        return new ResponseEntity<>(avaliacaoProtocoloService.criar(inputDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{protocoloId}")
    @CheckSecurity.AvaliacaoProtocolo.PodeEditar
    public ResponseEntity<AvaliacaoProtocoloDTO> atualizar(
            @PathVariable Long protocoloId,
            @RequestBody @Valid AvaliacaoProtocoloInputDTO inputDTO
    ) {
        return ResponseEntity.ok(avaliacaoProtocoloService.atualizar(protocoloId, inputDTO));
    }
}

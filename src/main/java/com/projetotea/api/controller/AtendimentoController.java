package com.projetotea.api.controller;

import com.projetotea.api.DTO.AtendimentoFiltroDTO;
import com.projetotea.api.DTO.AtendimentoInputDTO;
import com.projetotea.api.DTO.AtendimentoResponseDTO;
import com.projetotea.core.security.CheckSecurity;
import com.projetotea.domain.model.StatusAtendimento;
import com.projetotea.domain.service.AtendimentoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("atendimentos")
@RequiredArgsConstructor
public class AtendimentoController {

    private final AtendimentoService atendimentoService;

    @GetMapping
    @CheckSecurity.Atendimento.PodeListar
    public ResponseEntity<Page<AtendimentoResponseDTO>> listar(
            @RequestParam(required = false) List<StatusAtendimento> status,
            @RequestParam(required = false) List<Long> pacienteIds,
            @RequestParam(required = false) LocalDate dataInicio,
            @RequestParam(required = false) LocalDate dataFim,
            @RequestParam(required = false) LocalTime horaInicio,
            @RequestParam(required = false) LocalTime horaFim,
            Pageable pageable
    ) {
        var filtro = new AtendimentoFiltroDTO(status, horaInicio, horaFim, dataInicio, dataFim, pacienteIds);
        return ResponseEntity.ok(atendimentoService.buscarComFiltro(filtro, pageable));
    }
    @PostMapping
    @CheckSecurity.Atendimento.PodeCriarAtendimento
    public ResponseEntity<AtendimentoResponseDTO> criar(@RequestBody @Valid AtendimentoInputDTO atendimentoInputDTO) {
        return new ResponseEntity<>(atendimentoService.criar(atendimentoInputDTO), HttpStatus.CREATED);
    }


}

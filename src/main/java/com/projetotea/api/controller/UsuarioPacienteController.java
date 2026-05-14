package com.projetotea.api.controller;


import com.projetotea.api.DTO.*;
import com.projetotea.core.security.CheckSecurity;
import com.projetotea.domain.model.StatusAtendimento;
import com.projetotea.domain.service.AtendimentoService;
import com.projetotea.domain.service.CadastroPacienteService;
import com.projetotea.domain.service.PacienteService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;


@RestController
@RequestMapping("pacientes")
@RequiredArgsConstructor
public class UsuarioPacienteController {

        private final CadastroPacienteService cadastroPacienteService;
        private final AtendimentoService atendimentoService;
        private final PacienteService pacienteService;

        @GetMapping
        @CheckSecurity.Paciente.PodeListar
        public ResponseEntity<Page<PacienteDTO>> findAll(Pageable pageable) {
            return ResponseEntity.ok(pacienteService.findAll(pageable));
        }
        @GetMapping("/atendimentos")
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
        @PostMapping("/atendimentos")
        @CheckSecurity.Atendimento.PodeCriarAtendimento
        public ResponseEntity<AtendimentoResponseDTO> criar(@RequestBody @Valid AtendimentoInputDTO atendimentoInputDTO) {
            return new ResponseEntity<>(atendimentoService.criar(atendimentoInputDTO), HttpStatus.CREATED);
        }
        @PostMapping
        @CheckSecurity.Paciente.PodeCadastrar
        public ResponseEntity<PacienteDTO> cadastroPaciente(@RequestBody @Valid PacienteInputDTO pacienteInputDTO) {
            return ResponseEntity.ok(cadastroPacienteService.cadastroPaciente(pacienteInputDTO));
        }

}

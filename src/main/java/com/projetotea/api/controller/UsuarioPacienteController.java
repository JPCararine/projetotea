package com.projetotea.api.controller;

import com.projetotea.api.DTO.AtendimentoAgendadosDTO;
import com.projetotea.api.DTO.PacienteDTO;
import com.projetotea.api.DTO.PacienteInputDTO;
import com.projetotea.domain.service.UsuarioPacienteService;
import com.projetotea.infrastructure.repository.filter.AtendimentoFilter;
import com.projetotea.infrastructure.service.AtendimentoServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Pageable;


@RestController
@RequestMapping("pacientes")
@RequiredArgsConstructor
public class UsuarioPacienteController {

        private final UsuarioPacienteService usuarioPacienteService;
        private final AtendimentoServiceImpl atendimentoService;

        @GetMapping
        public ResponseEntity<Page<PacienteDTO>> findAll(Pageable pageable) {
            return ResponseEntity.ok(usuarioPacienteService.findAll(pageable));
        }
        @GetMapping("/atendimentos")
        public ResponseEntity<Page<AtendimentoAgendadosDTO>> listar(AtendimentoFilter filter, Pageable pageable,
                                                    @RequestParam(required = false, defaultValue = "-03:00") String timeOffSet) {
            return ResponseEntity.ok(atendimentoService.consultaAtendimentos(filter, timeOffSet, pageable));
        }
        @PostMapping
        public ResponseEntity<PacienteDTO> cadastroPaciente(@RequestBody @Valid PacienteInputDTO pacienteInputDTO) {
            return ResponseEntity.ok(usuarioPacienteService.cadastroPaciente(pacienteInputDTO));
        }

}

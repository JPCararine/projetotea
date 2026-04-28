package com.projetotea.api.controller;

import com.projetotea.api.DTO.PacienteDTO;
import com.projetotea.api.DTO.PacienteInputDTO;
import com.projetotea.domain.service.UsuarioPacienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("pacientes")
@RequiredArgsConstructor
public class UsuarioPacienteController {

        private final UsuarioPacienteService usuarioPacienteService;

        @GetMapping
        public ResponseEntity<List<PacienteDTO>> findAll() {
            return ResponseEntity.ok(usuarioPacienteService.findAll());
        }
        @PostMapping
        public ResponseEntity<PacienteDTO> cadastroPaciente(@RequestBody @Valid PacienteInputDTO pacienteInputDTO) {
            return ResponseEntity.ok(usuarioPacienteService.cadastroPaciente(pacienteInputDTO));
        }

}

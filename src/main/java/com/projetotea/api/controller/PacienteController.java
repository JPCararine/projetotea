package com.projetotea.api.controller;

import com.projetotea.api.DTO.PacienteDTO;
import com.projetotea.domain.service.UsuarioPacienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/usuarios/{usuarioId}/pacientes")
@RequiredArgsConstructor
public class PacienteController {

    private final UsuarioPacienteService usuarioPacienteService;

    @GetMapping
    public ResponseEntity<List<PacienteDTO>> findAll(@PathVariable Long usuarioId) {
       return ResponseEntity.ok(usuarioPacienteService.findAll(usuarioId));
   }
}

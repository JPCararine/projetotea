package com.projetotea.api.controller;

import com.projetotea.api.DTO.UsuarioDTO;
import com.projetotea.api.DTO.UsuarioIdNomeEmail;
import com.projetotea.api.DTO.UsuarioInputDTO;
import com.projetotea.domain.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> findAll() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    @PostMapping
    public ResponseEntity<UsuarioIdNomeEmail> cadastroUsuario(@RequestBody @Valid UsuarioInputDTO usuarioInputDTO) {
        return new ResponseEntity<>(usuarioService.create(usuarioInputDTO), HttpStatus.CREATED);
    }



}

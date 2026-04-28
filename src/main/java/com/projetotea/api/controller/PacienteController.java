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
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class PacienteController {

    private final UsuarioPacienteService usuarioPacienteService;


}

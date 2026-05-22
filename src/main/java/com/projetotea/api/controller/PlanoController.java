package com.projetotea.api.controller;

import com.projetotea.api.DTO.PlanoDTO;
import com.projetotea.domain.service.PlanoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/planos")
@RestController
@RequiredArgsConstructor
public class PlanoController {

    private final PlanoService planoService;

    @GetMapping
    public ResponseEntity<List<PlanoDTO>> findAll() {
        return ResponseEntity.ok(planoService.findAll());
    }
}

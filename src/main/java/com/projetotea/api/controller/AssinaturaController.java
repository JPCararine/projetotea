package com.projetotea.api.controller;

import com.projetotea.api.DTO.AssinaturaDTO;
import com.projetotea.domain.model.Assinatura;
import com.projetotea.domain.service.AssinaturaService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assinatura")
@AllArgsConstructor
public class AssinaturaController {

    private final AssinaturaService assinaturaService;

    @GetMapping
    public ResponseEntity<List<AssinaturaDTO>> findAssinatura() {
        return ResponseEntity.ok(assinaturaService.listAll());
    }

    @PostMapping("/{planoId}")
    public ResponseEntity<AssinaturaDTO> create(@PathVariable Long planoId) {
        return new ResponseEntity<>(assinaturaService.criar(planoId), HttpStatus.CREATED);
    }
}

package com.projetotea.api.controller;

import com.projetotea.api.DTO.AssinaturaDTO;
import com.projetotea.api.DTO.AssinaturaRequest;
import com.projetotea.payment.domain.service.AssinaturaService;
import com.projetotea.payment.gateway.abacatepay.dto.response.checkout.AssinaturaCheckoutResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assinaturas")
@AllArgsConstructor
public class AssinaturaController {

    private final AssinaturaService assinaturaService;

    @GetMapping("/me")
    public ResponseEntity<List<AssinaturaDTO>> findAssinatura() {
        return ResponseEntity.ok(assinaturaService.listAll());
    }

    @PostMapping
    public ResponseEntity<AssinaturaCheckoutResponse> create(@RequestBody @Valid AssinaturaRequest assinaturaRequest) {
        return new ResponseEntity<>(assinaturaService.criar(assinaturaRequest), HttpStatus.CREATED);
    }
}

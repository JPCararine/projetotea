package com.projetotea.payment.gateway.abacatepay;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
@RequiredArgsConstructor
public class AbacatePayWebHookValidator {

    private final AbacatePayConfig abacatePayConfig;

    public void validarSecret(String webhookSecret) {
        if(webhookSecret == null || !webhookSecret.equals(abacatePayConfig.webhookSecret())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Secret inválido");
        }
    }

}

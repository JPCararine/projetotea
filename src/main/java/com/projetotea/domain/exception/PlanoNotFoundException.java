package com.projetotea.domain.exception;

public class PlanoNotFoundException extends RuntimeException {
    public PlanoNotFoundException() {
        super("Plano não encontrado.");
    }
}

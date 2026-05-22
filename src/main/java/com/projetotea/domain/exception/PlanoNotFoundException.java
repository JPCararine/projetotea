package com.projetotea.domain.exception;

public class PlanoNotFoundException extends BaseNotFoundException {
    public PlanoNotFoundException() {
        super("Plano não encontrado.");
    }
}

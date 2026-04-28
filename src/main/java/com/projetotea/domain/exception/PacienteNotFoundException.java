package com.projetotea.domain.exception;

public class PacienteNotFoundException extends BaseNotFoundException {
    public PacienteNotFoundException() {
        super("Paciente não encontrado");
    }
}

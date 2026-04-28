package com.projetotea.domain.exception;

public class JaVinculado extends BaseNotFoundException {
    public JaVinculado() {
        super("Paciente já vinculado a esse usúario");
    }
}

package com.projetotea.domain.exception;

public class AtendimentoNotFoundException extends BaseNotFoundException {
    public AtendimentoNotFoundException(Long id) {
        super("Atendimento de id: " + id + " não encontrado");
    }
}

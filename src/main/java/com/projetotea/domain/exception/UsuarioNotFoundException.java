package com.projetotea.domain.exception;

public class UsuarioNotFoundException extends BaseNotFoundException {
    public UsuarioNotFoundException() {
        super("Usuário não encontrado");
    }
}

package com.projetotea.domain.exception;

public class EmailJaExistente extends BaseNotFoundException{
    public EmailJaExistente() {
        super("Email em uso");
    }
}

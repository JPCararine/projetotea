package com.projetotea.domain.exception;

public class EmailJaExistente extends BaseEntityInUse{
    public EmailJaExistente() {
        super("Email em uso");
    }
}

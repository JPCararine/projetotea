package com.projetotea.domain.exception;

public class HorarioEmConflitoException extends BaseEntityInUse{
    public HorarioEmConflitoException() {
        super("Você já possui um atendimento nesse horário");
    }
}

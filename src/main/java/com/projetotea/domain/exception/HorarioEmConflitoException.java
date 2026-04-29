package com.projetotea.domain.exception;

public class HorarioEmConflitoException extends BaseNotFoundException{
    public HorarioEmConflitoException() {
        super("Você já possui um atendimento nesse horário");
    }
}

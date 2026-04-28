package com.projetotea.domain.exception;

public class NegocioException extends BaseNotFoundException{
    public NegocioException(String message) {
        super(message);
    }
}

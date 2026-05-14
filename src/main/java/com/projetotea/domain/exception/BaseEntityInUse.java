package com.projetotea.domain.exception;

public abstract class BaseEntityInUse extends RuntimeException{
    public BaseEntityInUse(String message) {
        super(message);
    }
}

package com.projetotea.domain.exception;

public class AvaliacaoNotFoundException extends BaseNotFoundException {
    public AvaliacaoNotFoundException(Long id) {
        super("AvaliaÃ§Ã£o nÃ£o encontrada: " + id);
    }
}

package com.projetotea.domain.exception;

public class AvaliacaoProtocoloNotFoundException extends BaseNotFoundException {
    public AvaliacaoProtocoloNotFoundException(Long id) {
        super("Protocolo de avaliaÃ§Ã£o nÃ£o encontrado: " + id);
    }
}

CREATE TABLE assinatura (
                            id          BIGINT          NOT NULL AUTO_INCREMENT,
                            usuario_id  BIGINT          NOT NULL,
                            plano_id    BIGINT          NOT NULL,
                            data_inicio DATETIME        NOT NULL,
                            data_fim    DATETIME        NULL COMMENT 'NULL = plano vitalício',
                            status      VARCHAR(20)     NOT NULL,

                            PRIMARY KEY (id),

                            CONSTRAINT fk_assinatura_usuario
                                FOREIGN KEY (usuario_id)
                                    REFERENCES usuario (id),

                            CONSTRAINT fk_assinatura_plano
                                FOREIGN KEY (plano_id)
                                    REFERENCES plano (id)
) ENGINE=InnoDB;
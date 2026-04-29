CREATE TABLE atendimento_usuario (
                                     atendimento_id BIGINT NOT NULL,
                                     usuario_id     BIGINT NOT NULL,

                                     PRIMARY KEY (atendimento_id, usuario_id),

                                     CONSTRAINT fk_atendimento_usuario_atendimento
                                         FOREIGN KEY (atendimento_id)
                                             REFERENCES atendimento (id),

                                     CONSTRAINT fk_atendimento_usuario_usuario
                                         FOREIGN KEY (usuario_id)
                                             REFERENCES usuario (id)
);
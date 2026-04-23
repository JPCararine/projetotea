CREATE TABLE paciente_usuario (
                                  paciente_id BIGINT NOT NULL,
                                  usuario_id BIGINT NOT NULL,

                                  tipo ENUM('FAMILIAR', 'PROFISSIONAL') NOT NULL,

                                  PRIMARY KEY (paciente_id, usuario_id),

                                  CONSTRAINT fk_pu_paciente
                                      FOREIGN KEY (paciente_id) REFERENCES paciente(id),

                                  CONSTRAINT fk_pu_usuario
                                      FOREIGN KEY (usuario_id) REFERENCES usuario(id)
) ENGINE=InnoDB;
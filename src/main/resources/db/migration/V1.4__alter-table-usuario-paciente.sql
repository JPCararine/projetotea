
ALTER TABLE paciente_usuario DROP FOREIGN KEY fk_pu_paciente;
ALTER TABLE paciente_usuario DROP FOREIGN KEY fk_pu_usuario;


ALTER TABLE paciente_usuario DROP PRIMARY KEY;


ALTER TABLE paciente_usuario
    ADD COLUMN id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;


ALTER TABLE paciente_usuario
    ADD CONSTRAINT fk_pu_paciente
        FOREIGN KEY (paciente_id) REFERENCES paciente(id);

ALTER TABLE paciente_usuario
    ADD CONSTRAINT fk_pu_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuario(id);


ALTER TABLE paciente_usuario
    ADD CONSTRAINT uk_paciente_usuario UNIQUE (paciente_id, usuario_id);
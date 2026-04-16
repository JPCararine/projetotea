ALTER TABLE atendimento
    ADD COLUMN data_atendimento DATE,
    ADD COLUMN hora_inicio TIME,
    ADD COLUMN hora_fim TIME;

UPDATE atendimento
SET
    data_atendimento = DATE(data_hora),
    hora_inicio = TIME(data_hora),
    hora_fim = TIME(data_hora);

ALTER TABLE atendimento
    MODIFY data_atendimento DATE NOT NULL,
    MODIFY hora_inicio TIME NOT NULL,
    MODIFY hora_fim TIME NOT NULL;

ALTER TABLE atendimento
    DROP COLUMN data_hora;
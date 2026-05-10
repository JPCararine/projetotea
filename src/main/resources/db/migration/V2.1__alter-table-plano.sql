ALTER TABLE plano
    ADD COLUMN duracao_dias INT     NULL COMMENT 'NULL = plano vitalício',
    ADD COLUMN ativo        BOOLEAN NOT NULL DEFAULT TRUE;

INSERT INTO plano (nome, preco, duracao_dias, ativo) VALUES
                                                         ('Mensal',   29.90,  30,   TRUE),
                                                         ('Anual',    199.90, 365,  TRUE),
                                                         ('Vitalício',499.90, NULL, TRUE);
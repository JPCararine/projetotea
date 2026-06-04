ALTER TABLE assinatura
    MODIFY COLUMN status VARCHAR(30) NOT NULL,
    MODIFY COLUMN data_cancelamento DATETIME(6) NULL;

CREATE UNIQUE INDEX uk_assinatura_gateway_subs_id
    ON assinatura (gateway_subs_id);

CREATE UNIQUE INDEX uk_assinatura_external_id
    ON assinatura (external_id);

CREATE INDEX idx_assinatura_usuario_status
    ON assinatura (usuario_id, status);

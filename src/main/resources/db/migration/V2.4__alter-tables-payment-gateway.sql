ALTER TABLE usuario
    ADD COLUMN customer_id VARCHAR(255) NULL;

ALTER TABLE plano
    ADD COLUMN abacate_pay_product_id VARCHAR(255) NULL;

ALTER TABLE assinatura
    ADD COLUMN forma_pagamento VARCHAR(20) NULL,
    ADD COLUMN gateway_checkout_id VARCHAR(255) NULL;

CREATE UNIQUE INDEX uk_usuario_customer_id
    ON usuario (customer_id);

CREATE UNIQUE INDEX uk_plano_abacate_pay_product_id
    ON plano (abacate_pay_product_id);

CREATE UNIQUE INDEX uk_assinatura_gateway_checkout_id
    ON assinatura (gateway_checkout_id);

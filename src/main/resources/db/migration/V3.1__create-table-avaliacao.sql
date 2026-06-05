CREATE TABLE avaliacao_protocolo (
    id BIGINT NOT NULL AUTO_INCREMENT,
    codigo VARCHAR(50) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    versao VARCHAR(30) NOT NULL,
    estrutura_json LONGTEXT NOT NULL,
    ativo BIT NOT NULL DEFAULT 1,
    criado_em DATETIME(6),

    PRIMARY KEY (id),
    CONSTRAINT uk_avaliacao_protocolo_codigo_versao UNIQUE (codigo, versao)
) ENGINE=InnoDB;

CREATE TABLE avaliacao (
    id BIGINT NOT NULL AUTO_INCREMENT,
    codigo VARCHAR(36) NOT NULL,
    paciente_id BIGINT NOT NULL,
    protocolo_id BIGINT NOT NULL,
    protocolo_codigo VARCHAR(50) NOT NULL,
    protocolo_nome VARCHAR(255) NOT NULL,
    protocolo_versao VARCHAR(30) NOT NULL,
    criado_por_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL,
    criado_em DATETIME(6),
    finalizado_em DATETIME(6),

    PRIMARY KEY (id),
    CONSTRAINT uk_avaliacao_codigo UNIQUE (codigo),
    CONSTRAINT fk_avaliacao_paciente FOREIGN KEY (paciente_id) REFERENCES paciente (id),
    CONSTRAINT fk_avaliacao_protocolo FOREIGN KEY (protocolo_id) REFERENCES avaliacao_protocolo (id),
    CONSTRAINT fk_avaliacao_criado_por FOREIGN KEY (criado_por_id) REFERENCES usuario (id)
) ENGINE=InnoDB;

CREATE TABLE avaliacao_resposta (
    id BIGINT NOT NULL AUTO_INCREMENT,
    avaliacao_id BIGINT NOT NULL,
    nivel INT NOT NULL,
    categoria_codigo VARCHAR(50) NOT NULL,
    categoria_nome VARCHAR(255) NOT NULL,
    item_codigo VARCHAR(80) NOT NULL,
    item_numero INT NOT NULL,
    competencia TEXT NOT NULL,
    descricao TEXT,
    resposta VARCHAR(30) NOT NULL,
    pontuacao INT,

    PRIMARY KEY (id),
    CONSTRAINT fk_avaliacao_resposta_avaliacao FOREIGN KEY (avaliacao_id) REFERENCES avaliacao (id)
) ENGINE=InnoDB;

CREATE TABLE avaliacao_score_categoria (
    id BIGINT NOT NULL AUTO_INCREMENT,
    avaliacao_id BIGINT NOT NULL,
    nivel INT,
    categoria_codigo VARCHAR(50) NOT NULL,
    categoria_nome VARCHAR(255) NOT NULL,
    media_percentual DECIMAL(5,2) NOT NULL,
    itens_pontuados INT NOT NULL,
    itens_nao_observados INT NOT NULL,
    total_itens INT NOT NULL,

    PRIMARY KEY (id),
    CONSTRAINT fk_avaliacao_score_avaliacao FOREIGN KEY (avaliacao_id) REFERENCES avaliacao (id)
) ENGINE=InnoDB;

CREATE INDEX idx_avaliacao_paciente_status ON avaliacao (paciente_id, status);
CREATE INDEX idx_avaliacao_resposta_avaliacao ON avaliacao_resposta (avaliacao_id);
CREATE INDEX idx_avaliacao_score_avaliacao_nivel ON avaliacao_score_categoria (avaliacao_id, nivel);

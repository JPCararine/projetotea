CREATE TABLE paciente (
                          id BIGINT NOT NULL AUTO_INCREMENT,

                          nome VARCHAR(255) NOT NULL,
                          data_nascimento DATE,
                          cpf VARCHAR(255) UNIQUE,
                          telefone VARCHAR(255),

                          data_cadastro DATETIME(6),

                          PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE usuario (
                         id BIGINT NOT NULL AUTO_INCREMENT,

                         nome VARCHAR(255) NOT NULL,
                         email VARCHAR(255) NOT NULL UNIQUE,
                         senha VARCHAR(255) NOT NULL,

                         data_cadastro DATETIME(6),

                         categoria ENUM ('ADMIN','MEDICO','RESPONSAVEL') NOT NULL,

                         PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE atendimento (
                             id BIGINT NOT NULL AUTO_INCREMENT,

                             codigo VARCHAR(36) NOT NULL UNIQUE,

                             data_hora DATETIME(6) NOT NULL,
                             observacoes TEXT,

                             status ENUM ('AGENDADO','CANCELADO','EM_ANDAMENTO','FINALIZADO') NOT NULL,

                             data_criacao DATETIME(6),
                             data_cancelamento DATETIME(6),
                             data_finalizado DATETIME(6),

                             paciente_id BIGINT NOT NULL,
                             usuario_id BIGINT NOT NULL,

                             PRIMARY KEY (id),

                             CONSTRAINT fk_atendimento_paciente
                                 FOREIGN KEY (paciente_id) REFERENCES paciente (id),

                             CONSTRAINT fk_atendimento_usuario
                                 FOREIGN KEY (usuario_id) REFERENCES usuario (id)
) ENGINE=InnoDB;
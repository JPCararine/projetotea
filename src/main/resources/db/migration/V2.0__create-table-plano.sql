CREATE TABLE plano (
                        id BIGINT NOT NULL AUTO_INCREMENT,

                        nome VARCHAR(255) NOT NULL,

                        preco DECIMAL(10,2) NOT NULL,

                         PRIMARY KEY (id)
) ENGINE=InnoDB;
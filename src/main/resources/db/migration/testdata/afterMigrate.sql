set foreign_key_checks = 0;

delete from usuario;
delete from paciente_usuario;
delete from paciente;
delete from atendimento;
delete from atendimento_usuario;
delete from assinatura;
delete from plano;

set foreign_key_checks = 1;


alter table usuario auto_increment = 1;
alter table paciente auto_increment = 1;

insert into paciente (id, nome, data_nascimento, cpf, telefone, data_cadastro, genero) values
                                                                                           (1, 'Pedro Silva', '2015-03-10', '11111111111', '11999999999', current_timestamp(), 'MASCULINO'),
                                                                                           (2, 'Lucas Souza', '2012-07-22', '22222222222', '11888888888', current_timestamp(), 'MASCULINO'),
                                                                                           (3, 'Mariana Lima', '2018-01-15', '33333333333', '11777777777', current_timestamp(), 'FEMININO');


insert into usuario (id, nome, email, senha, categoria, data_cadastro) values
                                                                           (1, 'João Pedro', 'joaop@gmail.com', '$2a$10$Y3gHr1/yp7RSkOxhfMiN6O/psn9tX2pEOosJI6w5xem8Fn.aIBcOi', 'ADMIN', current_timestamp()),
                                                                           (2, 'Maria Souza', 'maria@email.com', '$2a$10$Y3gHr1/yp7RSkOxhfMiN6O/psn9tX2pEOosJI6w5xem8Fn.aIBcOi', 'FAMILIAR', current_timestamp()),
                                                                           (3, 'Carlos Lima', 'carlos@email.com', '$2a$10$Y3gHr1/yp7RSkOxhfMiN6O/psn9tX2pEOosJI6w5xem8Fn.aIBcOi', 'PROFISSIONAL', current_timestamp()),
                                                                           (4, 'Ana Paula', 'ana@email.com', '$2a$10$Y3gHr1/yp7RSkOxhfMiN6O/psn9tX2pEOosJI6w5xem8Fn.aIBcOi', 'FAMILIAR', current_timestamp()),
                                                                            (5, 'João Silva', 'joao@email.com', '$2a$10$Y3gHr1/yp7RSkOxhfMiN6O/psn9tX2pEOosJI6w5xem8Fn.aIBcOi', 'PROFISSIONAL', current_timestamp());

insert into paciente_usuario (paciente_id, usuario_id, tipo_relacao) values
                                                                 (1, 1, 'PROFISSIONAL'),
                                                                 (1, 2, 'FAMILIAR');


insert into paciente_usuario (paciente_id, usuario_id, tipo_relacao) values
                                                                 (2, 3, 'PROFISSIONAL'),
                                                                 (2, 2, 'FAMILIAR');


insert into paciente_usuario (paciente_id, usuario_id, tipo_relacao) values
                                                                 (3, 1, 'PROFISSIONAL'),
                                                                 (3, 4, 'FAMILIAR');

INSERT INTO plano (id, nome, preco, duracao_dias, ativo)
VALUES
    (1,'Premium Mensal', 29.90, 30, true),
    (2,'Premium Anual', 297.00, 365, true),
    (3,'Premium Vitalício', 400.00, null, true);
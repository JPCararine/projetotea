ALTER TABLE paciente_usuario
    ADD CONSTRAINT chk_tipo_relacao
        CHECK (tipo_relacao IN ('FAMILIAR', 'PROFISSIONAL'));

CREATE INDEX idx_atendimento_status
    ON atendimento (status);

CREATE INDEX idx_atendimento_data
    ON atendimento (data_atendimento);

CREATE INDEX idx_plano_ativo
    ON plano (ativo);
UPDATE usuario
SET categoria = 'FAMILIAR'
WHERE categoria = 'RESPONSAVEL';

UPDATE usuario
SET categoria = 'PROFISSIONAL'
WHERE categoria = 'MEDICO';

ALTER TABLE usuario
    MODIFY categoria ENUM (
        'FAMILIAR',
        'PROFISSIONAL',
        'ADMIN'
        );
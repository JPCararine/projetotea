package com.projetotea.infrastructure.spec;

import com.projetotea.api.DTO.AtendimentoFiltroDTO;
import com.projetotea.domain.model.Atendimento;
import com.projetotea.domain.model.Usuario;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class AtendimentoSpec {

    public static Specification<Atendimento> comFiltros(AtendimentoFiltroDTO filtro, Long usuarioId) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            Join<Atendimento, Usuario> usuariosJoin = root.join("usuarios");
            predicates.add(cb.equal(usuariosJoin.get("id"), usuarioId));

            if (filtro.getStatus()!= null && !filtro.getStatus().isEmpty()) {
                predicates.add(root.get("status").in(filtro.getStatus()));
            }

            if (filtro.getPacienteIds() != null && !filtro.getPacienteIds().isEmpty()) {
                predicates.add(root.get("paciente").get("id").in(filtro.getPacienteIds()));
            }

            if (filtro.getDataInicio() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("dataAtendimento"), filtro.getDataInicio()));
            }

            if (filtro.getDataFim() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("dataAtendimento"), filtro.getDataFim()));
            }

            if (filtro.getHoraInicio() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("horaInicio"), filtro.getHoraInicio()));
            }
            if (filtro.getHoraFim() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("horaFim"), filtro.getHoraFim()));
            }
            query.distinct(true);
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}

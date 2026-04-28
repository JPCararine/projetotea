package com.projetotea.infrastructure.service;

import com.projetotea.api.DTO.AtendimentoAgendadosDTO;
import com.projetotea.api.DTO.AtendimentoDTO;
import com.projetotea.core.security.TeaSecurity;
import com.projetotea.domain.model.Atendimento;
import com.projetotea.domain.service.AtendimentoQueryService;
import com.projetotea.infrastructure.repository.filter.AtendimentoFilter;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;

@Service
public class AtendimentoServiceImpl implements AtendimentoQueryService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private TeaSecurity teaSecurity;

    @Override
    public Page<AtendimentoAgendadosDTO> consultaAtendimentos(AtendimentoFilter filter, String timeOffSet, Pageable pageable) {
        var builder = entityManager.getCriteriaBuilder();
        var query = builder.createQuery(AtendimentoAgendadosDTO.class);
        var root = query.from(Atendimento.class);
        var predicates = new ArrayList<Predicate>();
        Long usuarioId = teaSecurity.getUsuarioId();

        var dataConvertida = builder.function(
                "coalesce", Date.class,
                builder.function("convert_tz", Date.class,
                        root.get("dataCriacao"),
                        builder.literal("+00:00"),
                        builder.literal(timeOffSet)
                ),
                root.get("dataCriacao")
        );

        var selection = builder.construct(
                AtendimentoAgendadosDTO.class,
                root.get("codigo"),
                root.get("status"),
                root.get("dataAtendimento"),
                root.get("horaInicio"),
                root.get("horaFim"),
                root.get("paciente").get("id"),
                root.get("paciente").get("nome"),
                root.get("usuario").get("id"),
                root.get("usuario").get("nome")
        );

        predicates.add(
                builder.equal(root.get("usuario").get("id"), usuarioId)
        );

        if (filter.getPacientesIds() != null) {
            predicates.add(root.get("paciente").get("id").in(filter.getPacientesIds()));
        }
        if (filter.getDataCriacaoInicio() != null) {
            predicates.add(builder.greaterThanOrEqualTo(root.get("dataAtendimento"), filter.getDataCriacaoInicio().toLocalDate()));
        }
        if (filter.getDataCriacaoFim() != null) {
            predicates.add(builder.lessThanOrEqualTo(root.get("dataAtendimento"), filter.getDataCriacaoFim().toLocalDate()));
        }
        if (filter.getStatus() != null) {
            predicates.add(root.get("status").in(filter.getStatus()));
        }


        query.select(selection)
                .where(predicates.toArray(new Predicate[0]))
                .orderBy(builder.desc(root.get("dataAtendimento")));


        var typedQuery = entityManager.createQuery(query);
        typedQuery.setFirstResult((int) pageable.getOffset());
        typedQuery.setMaxResults(pageable.getPageSize());

        var resultados = typedQuery.getResultList();


        var countQuery = builder.createQuery(Long.class);
        var countRoot = countQuery.from(Atendimento.class);
        var countPredicates = new ArrayList<Predicate>();

        countPredicates.add(
                builder.equal(countRoot.get("usuario").get("id"), usuarioId)
        );
        if (filter.getPacientesIds() != null) {
            countPredicates.add(countRoot.get("paciente").get("id").in(filter.getPacientesIds()));
        }
        if (filter.getDataCriacaoInicio() != null) {
            countPredicates.add(builder.greaterThanOrEqualTo(countRoot.get("dataAtendimento"), filter.getDataCriacaoInicio().toLocalDate()));
        }
        if (filter.getDataCriacaoFim() != null) {
            countPredicates.add(builder.lessThanOrEqualTo(countRoot.get("dataAtendimento"), filter.getDataCriacaoFim().toLocalDate()));
        }
        if (filter.getStatus() != null) {
            countPredicates.add(countRoot.get("status").in(filter.getStatus()));
        }

        countQuery.select(builder.count(countRoot))
                .where(countPredicates.toArray(new Predicate[0]));

        var total = entityManager.createQuery(countQuery).getSingleResult();

        return new PageImpl<>(resultados, pageable, total);
    }


}
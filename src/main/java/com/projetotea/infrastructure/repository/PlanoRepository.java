package com.projetotea.infrastructure.repository;

import com.projetotea.domain.model.Plano;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanoRepository extends JpaRepository<Plano, Long> {
}

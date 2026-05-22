package com.projetotea.infrastructure.repository;

import com.projetotea.domain.model.Plano;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanoRepository extends JpaRepository<Plano, Long> {

    List<Plano> findByAtivoTrue();
}

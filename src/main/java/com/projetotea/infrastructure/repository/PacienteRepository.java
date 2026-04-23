package com.projetotea.infrastructure.repository;

import com.projetotea.domain.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {


}

package com.projetotea.infrastructure.repository;


import com.projetotea.domain.model.Paciente;
import com.projetotea.domain.model.UsuarioPaciente;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface UsuarioPacienteRepository extends JpaRepository<UsuarioPaciente, Long> {

    boolean existsByUsuarioIdAndPacienteId(Long usuarioId, Long pacienteId);

    @Query("select pu.paciente from UsuarioPaciente pu where pu.usuario.id = :usuarioId")
    Page<Paciente> findPacientesByUsuarioId(Long usuarioId, Pageable pageable);
}

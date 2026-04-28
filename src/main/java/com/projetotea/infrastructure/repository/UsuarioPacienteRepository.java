package com.projetotea.infrastructure.repository;


import com.projetotea.domain.model.Paciente;
import com.projetotea.domain.model.UsuarioPaciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UsuarioPacienteRepository extends JpaRepository<UsuarioPaciente, Long> {

    boolean existsByUsuarioIdAndPacienteId(Long usuarioId, Long pacienteId);

    @Query("select pu.paciente from UsuarioPaciente pu where pu.usuario.id = :usuarioId")
    List<Paciente> findPacientesByUsuarioId(Long usuarioId);
}

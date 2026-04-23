package com.projetotea.infrastructure.repository;

import com.projetotea.domain.model.Paciente;
import com.projetotea.domain.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

    Long id(Long id);


}

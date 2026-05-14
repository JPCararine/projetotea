package com.projetotea.core.security;

import com.projetotea.infrastructure.repository.UsuarioPacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class TeaSecurity {

    @Autowired
    private UsuarioPacienteRepository usuarioPacienteRepository;

    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
    public Long getUsuarioId() {
        Jwt jwt = (Jwt) getAuthentication().getPrincipal();

        String type = jwt.getClaim("type");

        if(!"user".equals(type)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas usuários podem realizar esse serviço");
        }
        return jwt.getClaim("user_id");
    }

    public boolean vinculoComPaciente(Long pacienteId) {
        Long usuarioId = getUsuarioId();

        return usuarioPacienteRepository.existsByUsuarioIdAndPacienteId(usuarioId, pacienteId);
    }
}

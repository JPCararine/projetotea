package com.projetotea.core.security;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

public @interface CheckSecurity {

    public @interface Paciente {

        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @PreAuthorize("hasAuthority('SCOPE_WRITE') and isAuthenticated()")
        public @interface PodeCadastrar {}

        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @PreAuthorize("hasAuthority('SCOPE_READ') and isAuthenticated()")
        public @interface  PodeListar {}


    }

    public @interface Atendimento {

        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @PreAuthorize("hasAuthority('SCOPE_WRITE') and isAuthenticated() and @teaSecurity.vinculoComPaciente(#atendimentoInputDTO.paciente.id)")
        public @interface PodeCriarAtendimento {}

        @Retention(RetentionPolicy.RUNTIME)
        @Target(ElementType.METHOD)
        @PreAuthorize("hasAuthority('SCOPE_READ') and isAuthenticated()")
        public @interface  PodeListar {}



    }
}

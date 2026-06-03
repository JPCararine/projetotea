package com.projetotea.domain.model;

import com.projetotea.payment.domain.model.Assinatura;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.br.CPF;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Usuario {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String senha;

    private String customerId;

    private String cpf;

    private String telefone;

    @CreationTimestamp
    private OffsetDateTime dataCadastro;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CategoriaUsuario categoria;

    @ManyToMany(mappedBy = "usuarios")
    private List<Atendimento> atendimentos;

    @OneToMany(mappedBy = "usuario")
    private Set<UsuarioPaciente> pacientes;

    @OneToMany(mappedBy = "usuario")
    private List<Assinatura> assinaturas;
}

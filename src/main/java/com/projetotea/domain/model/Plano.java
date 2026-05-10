package com.projetotea.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
public class Plano {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private BigDecimal preco;

    @Column(name = "duracao_dias")
    private Integer duracaoDias;

    private Boolean ativo;

    @OneToMany(mappedBy = "plano")
    private List<Assinatura> assinaturas;


}

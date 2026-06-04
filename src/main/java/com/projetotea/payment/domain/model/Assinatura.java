package com.projetotea.payment.domain.model;

import com.projetotea.domain.model.FormaPagamento;
import com.projetotea.domain.model.Plano;
import com.projetotea.domain.model.Usuario;
import com.projetotea.payment.domain.enums.StatusAssinatura;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Assinatura {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private Usuario usuario;

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private Plano plano;

    @Enumerated(EnumType.STRING)
    private FormaPagamento formaPagamento;

    private String gatewayCheckoutId;

    private String gatewaySubsId;

    private String externalId;

    @Column(name = "data_inicio")
    private OffsetDateTime dataInicio;
    @Column(name = "data_fim")
    private OffsetDateTime dataFim;

    @Column(name = "data_cancelamento")
    private OffsetDateTime dataCancelamento;

    @Enumerated(EnumType.STRING)
    private StatusAssinatura status;

}

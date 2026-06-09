package com.projetotea.payment.domain.repository;

import com.projetotea.payment.domain.model.Assinatura;
import com.projetotea.payment.domain.enums.StatusAssinatura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

public interface AssinaturaRepository extends JpaRepository<Assinatura, Long> {

    Optional<Assinatura> findByUsuarioIdAndStatus(Long usuarioId, StatusAssinatura status);

    boolean existsByUsuarioIdAndStatusIn(Long usuarioId, List<StatusAssinatura> status);

    @Modifying
    @Query("UPDATE Assinatura a SET a.status = :novoStatus WHERE a.status = :statusAtual AND a.dataFim < :now")
    int emAtrasoAssinatura(@Param("statusAtual") StatusAssinatura statusAtual,
                           @Param("novoStatus") StatusAssinatura novoStatus,
                           @Param("now") OffsetDateTime now);

    @Modifying
    @Query("UPDATE Assinatura a SET a.status = :novoStatus WHERE a.status = :statusAtual AND a.dataFim <= :dataLimite")
    int expirarAssinatura(@Param("statusAtual") StatusAssinatura statusAtual,
                          @Param("novoStatus") StatusAssinatura novoStatus,
                          @Param("days") OffsetDateTime dataLimite);

    List<Assinatura> findByUsuarioId(Long usuarioId);

    Optional<Assinatura> findByGatewayCheckoutId(String gatewayCheckoutId);

    Optional<Assinatura> findByGatewaySubsId(String gatewaySubsId);

    Optional<Assinatura> findByExternalId(String externalId);


}

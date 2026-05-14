package com.projetotea.infrastructure.repository;

import com.projetotea.domain.model.Assinatura;
import com.projetotea.domain.model.StatusAssinatura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

public interface AssinaturaRepository extends JpaRepository<Assinatura, Long> {

    Optional<Assinatura> findByUsuarioIdAndStatus(Long usuarioId, StatusAssinatura status);

    List<Assinatura> findByStatusAndDataFimBefore(StatusAssinatura status, OffsetDateTime now);

    @Modifying
    @Query("UPDATE Assinatura a SET a.status = :novoStatus WHERE a.status = :statusAtual AND a.dataFim < :now")
    int expirarAssinaturas(@Param("statusAtual") StatusAssinatura statusAtual,
                           @Param("novoStatus") StatusAssinatura novoStatus,
                           @Param("now") OffsetDateTime now);

    List<Assinatura> findByUsuarioId(Long usuarioId);
}

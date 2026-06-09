package com.projetotea.payment.domain.repository;

import com.projetotea.payment.domain.model.GatewayWebhookEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GatewayWebhookEventRepository extends JpaRepository<GatewayWebhookEvent, Long> {

}

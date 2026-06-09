package com.projetotea.payment.domain.model;

import com.projetotea.payment.domain.enums.GatewayWebhookStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;

@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(
        name = "gateway_webhook_event",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_gateway_webhook_event_key",
                        columnNames = {"gateway", "event_key"}
                )
        }
)
public class GatewayWebhookEvent {

    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String gateway;

    @Column(name = "event_type", nullable = false)
    private String eventType;

    @Column(name = "event_key", nullable = false)
    private String eventKey;

    @Column(name = "received_at", nullable = false)
    private OffsetDateTime receivedAt;

    @Column(name = "processed_at")
    private OffsetDateTime processedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GatewayWebhookStatus status;


}

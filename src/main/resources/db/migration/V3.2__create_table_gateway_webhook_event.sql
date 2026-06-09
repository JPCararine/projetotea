CREATE TABLE gateway_webhook_event (
                                       id BIGINT PRIMARY KEY AUTO_INCREMENT,

                                       gateway VARCHAR(50) NOT NULL,
                                       event_type VARCHAR(100) NOT NULL,
                                       event_key VARCHAR(255) NOT NULL,

                                       received_at DATETIME(6) NOT NULL,
                                       processed_at DATETIME(6) NULL,

                                       status VARCHAR(30) NOT NULL,


                                       CONSTRAINT uk_gateway_webhook_event_key
                                           UNIQUE (gateway, event_key)
);
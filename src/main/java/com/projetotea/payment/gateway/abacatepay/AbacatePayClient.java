package com.projetotea.payment.gateway.abacatepay;

import com.projetotea.payment.gateway.abacatepay.dto.AbacatePayStoreResponse;
import com.projetotea.payment.gateway.abacatepay.dto.request.AbacatePayBillRequest;
import com.projetotea.payment.gateway.abacatepay.dto.request.AbacatePayCustomerRequest;
import com.projetotea.payment.gateway.abacatepay.dto.response.checkout.AbacatePayBillResponse;
import com.projetotea.payment.gateway.abacatepay.dto.response.customer.AbacatePayCustomerResponse;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class AbacatePayClient {

    private final RestClient restClient;

    public AbacatePayClient(@Qualifier("abacatePayRestClient") RestClient restClient) {
        this.restClient = restClient;
    }

    public AbacatePayStoreResponse checkStore() {
        return restClient
                .get()
                .uri("/v2/store/get")
                .retrieve()
                .body(AbacatePayStoreResponse.class);

    }

    public AbacatePayBillResponse postCheckout(AbacatePayBillRequest billRequest) {

        return restClient
                .post()
                .uri("/v2/checkouts/create")
                .body(billRequest)
                .retrieve()
                .body(AbacatePayBillResponse.class);
    }

    public AbacatePayCustomerResponse postClient(AbacatePayCustomerRequest customerRequest) {
        return restClient
                .post()
                .uri("/v2/customers/create")
                .body(customerRequest)
                .retrieve()
                .body(AbacatePayCustomerResponse.class);
    }


}

package com.praksa.auction.service;

import com.praksa.auction.dto.PaymentInfoDto;
import com.praksa.auction.dto.PaymentResponseDto;
import com.praksa.auction.model.Person;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    @Autowired
    PersonService personService;
    @Value("${stripeSecretKey}")
    private String apiKey;

    public PaymentResponseDto createPaymentIntent(PaymentInfoDto paymentInfoDto) throws StripeException {
        Person buyer = personService.getPersonById(paymentInfoDto.getCustomerId());
        String custumerId = "";
        if (buyer.getCustomerId() == null) {
            custumerId = personService.createCustomerId(buyer);
        } else custumerId = buyer.getCustomerId();
        Stripe.apiKey = apiKey;
        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount((long) (paymentInfoDto.getAmount() * 100))
                        .setCurrency("USD")
                        .setCustomer(custumerId)
                        .addPaymentMethodType("card")
                        .putMetadata("product_id", String.valueOf(paymentInfoDto.getProductId()))
                        .build();
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        PaymentResponseDto paymentResponse = new PaymentResponseDto(paymentIntent.getClientSecret());
        return paymentResponse;
    }
}

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

    private String checkIfCustomerExists(long personId) throws StripeException {
        Person buyer = personService.getPersonById(personId);
        if (buyer.getCustomerId() == null) {
            return personService.createCustomerId(buyer);
        }
        return buyer.getCustomerId();
    }

    public PaymentResponseDto createPaymentIntent(PaymentInfoDto paymentInfoDto) throws StripeException {
        String customerId = checkIfCustomerExists(paymentInfoDto.getCustomerId());
        Stripe.apiKey = apiKey;
        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount((long) (paymentInfoDto.getAmount() * 100))
                        .setCurrency("USD")
                        .setCustomer(customerId)
                        .addPaymentMethodType("card")
                        .putMetadata("product_id", String.valueOf(paymentInfoDto.getProductId()))
                        .build();
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        return new PaymentResponseDto(paymentIntent.getClientSecret());
    }

    public PaymentResponseDto createSetUpIntent(long customer) throws StripeException {
        String customerId = checkIfCustomerExists(customer);
        Stripe.apiKey = apiKey;
        SetupIntentCreateParams params =
                SetupIntentCreateParams.builder()
                        .addPaymentMethodType("card")
                        .setCustomer(customerId)
                        .build();
        SetupIntent setupIntent= SetupIntent.create(params);
        return new PaymentResponseDto(setupIntent.getClientSecret());
    }
}

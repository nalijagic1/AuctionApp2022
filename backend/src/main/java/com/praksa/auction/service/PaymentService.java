package com.praksa.auction.service;

import com.praksa.auction.dto.PaymentInfoDto;
import com.praksa.auction.dto.PaymentResponseDto;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    @Value("${stripeSecretKey}")
    private String apiKey;
    public PaymentResponseDto createPaymentIntent(PaymentInfoDto paymentInfoDto) throws StripeException {
        Stripe.apiKey = apiKey;
        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount((long) (paymentInfoDto.getAmount() * 100))
                        .setCurrency("USD")
                        .addPaymentMethodType("card")
                        .putMetadata("product_id", paymentInfoDto.getProductId())
                        .build();
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        PaymentResponseDto paymentResponse = new PaymentResponseDto(paymentIntent.getClientSecret());
        return paymentResponse;
    }
}

package com.praksa.auction.controller;

import com.praksa.auction.dto.PaymentInfoDto;
import com.praksa.auction.service.PaymentService;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {
    @Autowired
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/auth/paymentIntent")
    public ResponseEntity<?> createPaymentIntente(@RequestBody PaymentInfoDto paymentInfoDto) throws StripeException {
        return ResponseEntity.ok(paymentService.createPaymentIntent(paymentInfoDto));
    }

    @PostMapping("/auth/setUpIntent")
    public  ResponseEntity<?> createSetUpIntent(@RequestParam long customer) throws StripeException {
        return ResponseEntity.ok(paymentService.createSetUpIntent(customer));
    }
}

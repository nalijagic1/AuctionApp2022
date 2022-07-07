package com.praksa.auction.controller;

import com.praksa.auction.model.Product;
import com.praksa.auction.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/api")
public class ProductController {

        private final ProductService productService;

        @Autowired
        public ProductController(ProductService productService) {
            this.productService = productService;
        }

    @GetMapping("/productRandom")
    public ResponseEntity<Product> getRandomProduct() {
            var value = productService.getOneRandom();
            return ResponseEntity.ok(value);
    }

    @GetMapping("/lastChance")
    public ResponseEntity<List<Product>> getLast(@RequestParam int start, @RequestParam int count) {
        var value = productService.getLastChance(start,count);
        return ResponseEntity.ok(value);
    }

    @GetMapping("/newest")
    public ResponseEntity<List<Product>> getNewest(@RequestParam int start, @RequestParam int count) {
        var value = productService.getNewest(start,count);
        return ResponseEntity.ok(value);
    }
}
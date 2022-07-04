package com.praksa.auction.controller;

import com.praksa.auction.model.Category;
import com.praksa.auction.model.Product;
import com.praksa.auction.service.CategoryService;
import com.praksa.auction.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

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
}

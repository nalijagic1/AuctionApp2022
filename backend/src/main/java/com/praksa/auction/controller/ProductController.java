package com.praksa.auction.controller;

import com.praksa.auction.model.Product;
import com.praksa.auction.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/productRandom")
    public ResponseEntity<Product> getRandomProduct() {
        return ResponseEntity.ok(productService.getRandomProduct());
    }

    @GetMapping("/lastChance")
    public ResponseEntity<List<Product>> getLastChance(@RequestParam int start, @RequestParam int count) {
        return ResponseEntity.ok(productService.getLastChance(start, count));
    }

    @GetMapping("/newest")
    public ResponseEntity<List<Product>> getNewest(@RequestParam int start, @RequestParam int count) {
        return ResponseEntity.ok(productService.getNewest(start, count));
    }

    @GetMapping()
    public ResponseEntity<List<Product>> getProductsFromCategory(@RequestParam String category, @RequestParam int count) {
        return ResponseEntity.ok(productService.getProductsFromCategory(category, count));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String search, @RequestParam int count) {
        return ResponseEntity.ok(productService.searchProducts(search, count));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts(@RequestParam int count) {
        return ResponseEntity.ok(productService.getAllProducts(count));
    }

    @GetMapping("/check")
    public ResponseEntity<String> checkSpelling(@RequestParam String search) {
        return ResponseEntity.ok(productService.checkSpelling(search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") int id) {
        Optional<Product> product = productService.getSelectedProduct(id);
        return ResponseEntity.ok(product.get());
    }
}

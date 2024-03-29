package com.praksa.auction.controller;

import com.praksa.auction.config.security.jwt.AuthEntryPointJwt;
import com.praksa.auction.dto.NewProductDto;
import com.praksa.auction.dto.SortDto;
import com.praksa.auction.enums.SortDirectionEnum;
import com.praksa.auction.model.Product;
import com.praksa.auction.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

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
    public ResponseEntity<List<Product>> getProductsFromCategory(@RequestParam String category, @RequestParam int count, @RequestParam String sortField,@RequestParam String sortDirection) {
        return ResponseEntity.ok(productService.getProductsFromCategory(category, count,new SortDto(sortField,SortDirectionEnum.valueOf(sortDirection))));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String search, @RequestParam int count,@RequestParam String sortField,@RequestParam String sortDirection) {
        return ResponseEntity.ok(productService.searchProducts(search, count,new SortDto(sortField,SortDirectionEnum.valueOf(sortDirection))));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts(@RequestParam int count,@RequestParam String sortField,@RequestParam String sortDirection) {
        return ResponseEntity.ok(productService.getAllActiveProducts(count,new SortDto(sortField,SortDirectionEnum.valueOf(sortDirection))));
    }

    @GetMapping("/checkSpelling")
    public ResponseEntity<String> checkSpelling(@RequestParam String search) {
        return ResponseEntity.ok(productService.getSearchSuggestion(search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id) {
        Optional<Product> product = productService.getSelectedProduct(id);
        return ResponseEntity.ok(product.get());
    }

    @PostMapping("/newProduct")
    public ResponseEntity<?> addNewProduct(@RequestBody NewProductDto productDto) {
        logger.info("Adding new product process started");
        return ResponseEntity.ok(productService.addNewProduct(productDto));
    }

    @PutMapping("/updatePayedStatus")
    public ResponseEntity<String> updatePayedStatus(@RequestBody boolean payed, @RequestParam long product) {
        productService.updatePayedStatus(payed, product);
        return ResponseEntity.ok("Successful update");
    }

    @PutMapping("/updateEndDate/{productId}")
    public ResponseEntity<String> updateEndDate(@RequestParam long date, @PathVariable long productId) {
        productService.updateEndDate(new Date(date), productId);
        return ResponseEntity.ok("Succesful date update");
    }
}

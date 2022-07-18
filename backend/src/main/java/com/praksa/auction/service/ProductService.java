package com.praksa.auction.service;

import com.praksa.auction.model.Product;
import com.praksa.auction.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository procuctRepository) {

        this.productRepository = procuctRepository;
    }

    public Optional<Product> getSelectedProduct(long id) {
        return productRepository.findById(id);
    }

    public Product getRandomProduct() {
        return productRepository.selectRandom(PageRequest.of(0, 1)).get(0);
    }

    public List<Product> getLastChance(int start, int count) {
        List<Product> products = productRepository.findProductsByEndingDateAfterOrderByEndingDateAsc(new Date(), PageRequest.of(start, count));
        return products;
    }

    public List<Product> getNewest(int start, int count) {
        List<Product> products = productRepository.findProductsByEndingDateAfterOrderByStartingDateDesc(new Date(), PageRequest.of(start, count));
        return products;
    }

    public List<Product> getProductsFromCategory(String category, int count) {
        return productRepository.getProductsFromCategory(category, PageRequest.of(0, count));
    }

    public List<Product> searchProducts(String search, int count) {
        return productRepository.findProductsByNameContainsIgnoreCaseAndEndingDateAfter(search, new Date(), PageRequest.of(0, count));
    }

    public List<Product> getAllProducts(int count) {
        return productRepository.findProductsByEndingDateAfter(PageRequest.of(0, count));
    }

}

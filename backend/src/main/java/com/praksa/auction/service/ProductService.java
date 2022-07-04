package com.praksa.auction.service;

import com.praksa.auction.model.Product;
import com.praksa.auction.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository procuctRepository) {

        this.productRepository = procuctRepository;
    }

    public Product getOneRandom(){
        Random rand = new Random();
        List<Product> products = productRepository.findAll();
        int randomElement = rand.nextInt(products.size());
        System.out.println(randomElement);
        return products.get(randomElement);
    }

}

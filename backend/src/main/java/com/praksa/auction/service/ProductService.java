package com.praksa.auction.service;

import com.praksa.auction.model.Product;
import com.praksa.auction.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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
        return products.get(randomElement);
    }

    public List<Product> getLastChance(int start, int count){
        List<Product> products = productRepository.findProductsByEndingDateAfterOrderByEndingDateAsc(new Date());
        if(products.size()-start<count) count = products.size()-start;
        List<Product> show = products.subList(start,start+count);
        return show;
    }

    public List<Product> getNewest(int start, int count){
        List<Product> products = productRepository.findProductsByStartingDateBeforeOrderByStartingDateDesc(new Date());
        if(products.size()-start<count) count = products.size()-start;
        List<Product> show = products.subList(start,start+count);
        return show;
    }

    public Optional<Product> getSelectedProduct(long id){
        return productRepository.findById(id);
    }

}

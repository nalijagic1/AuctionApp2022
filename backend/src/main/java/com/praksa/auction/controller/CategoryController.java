package com.praksa.auction.controller;

import com.praksa.auction.model.Category;
import com.praksa.auction.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@CrossOrigin(origins = "http://localhost:8080")
@RestController
public class CategoryController {
    @Autowired
    CategoryRepository categoryRepository;
    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategories() {
        try {
            List<Category> categories = new ArrayList<Category>();

            categoryRepository.findAll().forEach(categories::add);
            if (categories.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(categories, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

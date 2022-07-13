package com.praksa.auction.controller;

import com.praksa.auction.model.Subcategory;
import com.praksa.auction.service.SubcategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class SubcategoryController {
    private final SubcategoryService subcategoryService;

    @Autowired
    public SubcategoryController(SubcategoryService subcategoryService) {
        this.subcategoryService = subcategoryService;
    }

    @GetMapping("/subcategories/{categoryId}")
    public ResponseEntity<List<Subcategory>> getRandomProduct(@PathVariable long categoryId) {
        return ResponseEntity.ok(subcategoryService.getSubcategoriesFromCategory(categoryId));
    }
}

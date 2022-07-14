package com.praksa.auction.controller;

import com.praksa.auction.dto.CategoryDto;
import com.praksa.auction.model.Category;
import com.praksa.auction.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping()
    public ResponseEntity<List<Category>> getCategories() {
        return ResponseEntity.ok(categoryService.getCategories());

    }
    @GetMapping("/categoriesWithSubcategories")
    public ResponseEntity<List<CategoryDto>> get(){
        return ResponseEntity.ok(categoryService.getCategoriesWithSubcategories());
    }

}

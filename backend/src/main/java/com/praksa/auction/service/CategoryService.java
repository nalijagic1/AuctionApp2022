package com.praksa.auction.service;

import com.praksa.auction.dto.CategoryDto;
import com.praksa.auction.dto.SubcategoryDto;
import com.praksa.auction.model.Category;
import com.praksa.auction.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    public List<CategoryDto> getCategoriesWithSubcategories() {
        List<Category> categories = getCategories();
        List<CategoryDto> categoryDtos = new ArrayList<>();
        for (Category category : categories) {
            List<SubcategoryDto> subcategories = categoryRepository.findSubcategoriesWithCount(category.getId());
            categoryDtos.add(new CategoryDto(category, subcategories));
        }

        return categoryDtos;
    }
}

package com.praksa.auction.dto;

import com.praksa.auction.model.Category;

import java.util.List;

public class CategoryDto {
    private Category category;
    private List<SubcategoryDto>  subcategories;

    public CategoryDto(Category category, List<SubcategoryDto> subcategories) {
        this.category = category;
        this.subcategories = subcategories;
    }

    public CategoryDto() {
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<SubcategoryDto> getSubcategories() {
        return subcategories;
    }

    public void setSubcategories(List<SubcategoryDto> subcategories) {
        this.subcategories = subcategories;
    }
}

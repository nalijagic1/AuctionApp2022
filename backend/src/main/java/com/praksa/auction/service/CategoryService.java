package com.praksa.auction.service;

import com.praksa.auction.dto.CategoryDto;
import com.praksa.auction.dto.SubcategoryDto;
import com.praksa.auction.model.Category;
import com.praksa.auction.model.Subcategory;
import com.praksa.auction.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    private CategoryDto changeToDto(Category category,List<Object []> subcategory){
        CategoryDto catagories = new CategoryDto();
        catagories.setCategory(category);
        List<SubcategoryDto> subcategoryDtos = new ArrayList<>();
        for( Object[] sub : subcategory){
            SubcategoryDto sdto= new SubcategoryDto();
            sdto.setName(String.valueOf(sub[1]));
            sdto.setSubcategoryId(Long.parseLong(String.valueOf(sub[0])));
            sdto.setCount(Integer.parseInt(String.valueOf(sub[2])));
            subcategoryDtos.add(sdto);

        }
        catagories.setSubcategories(subcategoryDtos);
        return catagories;
    }
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    public List<CategoryDto> getCategoriesWithSubcategories(){
        List<Category> categories = getCategories();
        List<CategoryDto> categoryDtos = new ArrayList<>();
        for(Category category : categories){
            List<Object []> subcategories = categoryRepository.findSubcategoriesWithCount(category.getId());
            categoryDtos.add(changeToDto(category,subcategories));
        }

        return categoryDtos;
    }
}

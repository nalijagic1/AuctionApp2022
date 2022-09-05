package com.praksa.auction.service;

import com.praksa.auction.model.Subcategory;
import com.praksa.auction.repository.SubcategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SubcategoryService {
    private final SubcategoryRepository subcategoryRepository;

    @Autowired
    public SubcategoryService(SubcategoryRepository subcategoryRepository) {
        this.subcategoryRepository = subcategoryRepository;
    }

    public List<Subcategory> getSubcategoriesFromCategory(long categoryId) {
        return subcategoryRepository.findAllByCategoryId(categoryId);
    }

    public Subcategory getSubcategoryById(long subcategoryId){
        return subcategoryRepository.findById(subcategoryId).get();
    }
}

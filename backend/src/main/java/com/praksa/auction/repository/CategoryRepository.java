package com.praksa.auction.repository;

import com.praksa.auction.dto.SubcategoryDto;
import com.praksa.auction.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query(value = "SELECT NEW com.praksa.auction.dto.SubcategoryDto(s.id, s.name,COUNT(p.subcategory)) FROM Subcategory s LEFT JOIN Product p ON(s= p.subcategory) where s.category.id=:category Group by s.name,s.id", nativeQuery = false)
    List<SubcategoryDto> findSubcategoriesWithCount(@Param("category") long category);
}

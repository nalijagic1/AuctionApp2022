package com.praksa.auction.repository;

import com.praksa.auction.dto.SubcategoryDto;
import com.praksa.auction.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("SELECT NEW com.praksa.auction.dto.SubcategoryDto(s.id, s.name, COUNT(p.subcategory)) FROM Subcategory s LEFT JOIN Product p ON(s = p.subcategory) WHERE s.category.id = :category AND p.endingDate > CURRENT_DATE GROUP BY s.name, s.id")
    List<SubcategoryDto> findSubcategoriesWithCount(long category);
}

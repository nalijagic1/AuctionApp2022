package com.praksa.auction.repository;

import com.praksa.auction.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query(value = "SELECT s.id, s.name,COUNT(p.subcategory_id) FROM Subcategory s LEFT JOIN Product p ON(s.id = p.subcategory_id) WHERE s.category_id=:category GROUP BY s.name,s.id", nativeQuery = true)
    List<Object[]> findSubcategoriesWithCount(@Param("category") long category);
}

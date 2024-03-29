package com.praksa.auction.repository;

import com.praksa.auction.model.Subcategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubcategoryRepository extends JpaRepository<Subcategory, Long> {
    List<Subcategory> findAllByCategoryId(long catagoryId);

}

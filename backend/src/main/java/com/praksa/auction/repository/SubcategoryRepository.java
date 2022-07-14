package com.praksa.auction.repository;

import com.praksa.auction.model.Subcategory;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface SubcategoryRepository extends JpaRepository<Subcategory,Long> {
    List<Subcategory> findAllByCategoryId(long catagoryId);

}

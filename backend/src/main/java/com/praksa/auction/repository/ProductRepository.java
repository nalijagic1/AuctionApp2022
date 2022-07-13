package com.praksa.auction.repository;

import com.praksa.auction.model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "SELECT * FROM Product p Where p.ending_date > CURRENT_DATE ORDER BY RANDOM()", nativeQuery = true)
    List<Product> selectRandom(Pageable pageable);

    List<Product> findProductsByEndingDateAfterOrderByEndingDateAsc(Date date, Pageable pageable);

    List<Product> findProductsByEndingDateAfterOrderByStartingDateDesc(Date date, Pageable pageable);

    @Query(value = "SELECT p.id,p.name,p.description,p.subcategory_id,p.person_id,p.starting_price,p.starting_date,p.ending_date, p.address_id,p.shipping_option, p.phone_number FROM Product p, Subcategory s WHERE  p.subcategory_id = s.id  AND s.category_id = :categoryId", nativeQuery = true)
    List<Product> getProdctsFromCategory(@Param("categoryId") long categoryId);
}

package com.praksa.auction.repository;

import com.praksa.auction.model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "SELECT * FROM Product p Where p.ending_date > CURRENT_DATE ORDER BY RANDOM()", nativeQuery = true)
    List<Product> selectRandom(Pageable pageable);

    List<Product> findProductsByEndingDateAfterOrderByEndingDateAsc(Date date, Pageable pageable);

    List<Product> findProductsByEndingDateAfterOrderByStartingDateDesc(Date date, Pageable pageable);
}

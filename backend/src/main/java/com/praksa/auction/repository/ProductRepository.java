package com.praksa.auction.repository;

import com.praksa.auction.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findProductsByEndingDateAfterOrderByEndingDateAsc(Date date);
    List<Product> findProductsByStartingDateBeforeOrderByStartingDateDesc(Date date);
}

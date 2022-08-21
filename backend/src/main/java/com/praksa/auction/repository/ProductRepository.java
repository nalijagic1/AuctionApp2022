package com.praksa.auction.repository;

import com.praksa.auction.model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "SELECT * FROM Product p Where p.ending_date > CURRENT_DATE ORDER BY RANDOM()", nativeQuery = true)
    List<Product> selectRandom(Pageable pageable);

    List<Product> findProductsByEndingDateAfterOrderByEndingDateAsc(Date date, Pageable pageable);

    List<Product> findProductsByEndingDateAfterOrderByStartingDateDesc(Date date, Pageable pageable);

    @Query(value = "SELECT p.* FROM Product p, Subcategory s, Category c WHERE  p.subcategory_id = s.id  AND  s.category_id = c.id AND c.name = :category AND p.ending_date > CURRENT_DATE", nativeQuery = true)
    List<Product> getProductsFromCategory(String category, Pageable pageable);

    @Query(value = "SELECT * FROM Product p WHERE p.name ILIKE '%' || :search  || '%' AND p.ending_date > CURRENT_DATE ", nativeQuery = true)
    List<Product> searchProducts(String search, Pageable pageable);

    @Query(value = "SELECT * FROM Product p WHERE p.ending_date > CURRENT_DATE", nativeQuery = true)
    List<Product> findProductsByEndingDateAfter(Pageable pageable);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE Product SET payed=:payed WHERE id=:id", nativeQuery = true)
    void updatePayedStatus(boolean payed, long id);

    boolean existsProductByPersonId(long sellerId);
}

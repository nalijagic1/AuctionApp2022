package com.praksa.auction.repository;

import com.praksa.auction.model.Bid;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BidRepository extends JpaRepository<Bid, Long> {
    Bid findFirstByProductIdOrderByBidDesc(long productId);

    int countBidsByProductId(long productId);

    int countBidsByPersonId(long personId);

    @Query(value = "SELECT Count(b.id) FROM bid b, product p where p.id = b.product_id AND b.person_id = :userId and b.bid in ( SELECT MAX(b3.bid) FROM bid b3 group by b3.product_id ) AND p.ending_date < CURRENT_DATE ",nativeQuery = true)
    Integer countHighestBidder(long userId);
}

package com.praksa.auction.repository;

import com.praksa.auction.model.Bid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BidRepository extends JpaRepository<Bid, Long> {
    Bid findFirstByProductIdOrderByBidDesc(long productId);

    int countBidsByProductId(long productId);
}

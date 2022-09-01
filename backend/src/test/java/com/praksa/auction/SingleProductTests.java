package com.praksa.auction;

import com.praksa.auction.repository.BidRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;


@SpringBootTest
public class SingleProductTests {
    @Autowired
    private BidRepository bidRepository;

    @Test
    void countBids() {
        assertEquals(bidRepository.countBidsByProductId(8), 3);
    }

    @Test
    void getHighestBid() {
        double bid = bidRepository.findFirstByProductIdOrderByBidDesc(8).getBid();
        assertTrue(bid == 100);
    }

}

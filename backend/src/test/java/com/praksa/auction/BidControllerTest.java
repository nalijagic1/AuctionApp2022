package com.praksa.auction;

import com.praksa.auction.controller.BidController;
import com.praksa.auction.dto.BiddingInfoDto;
import com.praksa.auction.model.Bid;
import com.praksa.auction.repository.BidRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@SpringBootTest
public class BidControllerTest {
    @Autowired
    BidController bidController;
    @Autowired
    BidRepository bidRepository;

    @Test
    void bidding() {
        Bid highestBidOld = bidRepository.findFirstByProductIdOrderByBidDesc(5);
        bidController.placeBid(new BiddingInfoDto(5, 2, 35.50));
        Bid highestBidNew = bidRepository.findFirstByProductIdOrderByBidDesc(5);
        assertEquals(highestBidNew.getProduct(),highestBidOld.getProduct());
        assertTrue(highestBidNew.getBidDate().after(highestBidOld.getBidDate()));
        assertTrue(highestBidNew.getBid() > highestBidOld.getBid());
    }
}

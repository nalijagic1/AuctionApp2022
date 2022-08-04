package com.praksa.auction.service;

import com.praksa.auction.dto.BiddingInfoDto;
import com.praksa.auction.model.Bid;
import com.praksa.auction.repository.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class BidService {
    @Autowired
    private final BidRepository bidRepository;

    public BidService(BidRepository bidRepository) {
        this.bidRepository = bidRepository;
    }

    public Bid getHighestBid(int productId) {
        return bidRepository.findFirstByProductIdOrderByBidDesc(productId);
    }

    public int getCount(long productId) {
        return bidRepository.countBidsByProductId(productId);
    }

    public void bidOnProduct(Bid bid){
        bidRepository.save(bid);
    }
}

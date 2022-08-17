package com.praksa.auction.controller;


import com.praksa.auction.model.Bid;
import com.praksa.auction.service.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bids")
public class BidController {
    @Autowired
    public final BidService bidService;

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    @GetMapping("/highestBid/{productId}")
    public ResponseEntity<Bid> getHighestBid(@PathVariable int productId) {
        return ResponseEntity.ok(bidService.getHighestBid(productId));
    }

    @GetMapping("/bidCount/{productId}")
    public ResponseEntity<Integer> getBidCount(@PathVariable long productId) {
        return ResponseEntity.ok(bidService.getCount(productId));
    }
}

package com.praksa.auction.controller;

import com.praksa.auction.dto.BiddingInfoDto;
import com.praksa.auction.model.Bid;
import com.praksa.auction.service.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.time.DateTimeException;

@RestController
public class BidController {
    @Autowired
    public final BidService bidService;

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    @GetMapping("/highestBid/{productId}")
    public ResponseEntity<Bid> getHighestBid(@PathVariable long productId) {
        return ResponseEntity.ok(bidService.getHighestBid(productId));
    }

    @GetMapping("/bidCount/{productId}")
    public ResponseEntity<Integer> getBidCount(@PathVariable long productId) {
        return ResponseEntity.ok(bidService.getCount(productId));
    }

    @PostMapping("/registered/placeBid")
    public ResponseEntity<?> placeBid(@Valid @RequestBody BiddingInfoDto biddingInfo) {
        try {
            bidService.placeBid(biddingInfo);
            return ResponseEntity.ok("Succesfull bidding");
        } catch (IllegalArgumentException | DateTimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}

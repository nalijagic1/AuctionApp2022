package com.praksa.auction.controller;


import com.praksa.auction.dto.BiddingInfoDto;
import com.praksa.auction.model.Bid;
import com.praksa.auction.service.BidService;
import com.praksa.auction.service.PersonService;
import com.praksa.auction.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

@RestController
public class BidController {
    @Autowired
    public final BidService bidService;
    @Autowired
    public final ProductService productService;
    @Autowired
    public final PersonService personService;

    public BidController(BidService bidService, PersonService personService, ProductService productService) {
        this.bidService = bidService;
        this.personService = personService;
        this.productService = productService;
    }

    @GetMapping("/highestBid/{productId}")
    public ResponseEntity<Bid> getHighestBid(@PathVariable long productId) {
        return ResponseEntity.ok(bidService.getHighestBid(productId));
    }

    @GetMapping("/bidCount/{productId}")
    public ResponseEntity<Integer> getBidCount(@PathVariable long productId) {
        return ResponseEntity.ok(bidService.getCount(productId));
    }

    @PostMapping("/auth/bid")
    public ResponseEntity<?> bidOnProduct(@Valid @RequestBody BiddingInfoDto biddingInfo) {
        Bid newBid = new Bid();
        Date today = new Date();
        newBid.setProduct(productService.getSelectedProduct(biddingInfo.getProduct()).get());
        newBid.setPerson(personService.getPersonById(biddingInfo.getPerson()));
        newBid.setBid(biddingInfo.getBid());
        newBid.setBidDate(today);
        if (bidService.getHighestBid(biddingInfo.getPerson()).getPerson().getId() == biddingInfo.getPerson()) {
            return ResponseEntity
                    .badRequest()
                    .body("You cannot outbid yourself!");
        }
        if (newBid.getProduct().getEndingDate().before(today)) {
            return ResponseEntity
                    .badRequest()
                    .body("This auction has ended!");
        }
        bidService.bidOnProduct(newBid);
        return ResponseEntity.ok("Succesfull bidding");
    }
}

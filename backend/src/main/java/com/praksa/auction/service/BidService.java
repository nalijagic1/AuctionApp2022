package com.praksa.auction.service;

import com.praksa.auction.dto.BiddingInfoDto;
import com.praksa.auction.model.Bid;
import com.praksa.auction.repository.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DateTimeException;
import java.util.Date;

@Service
public class BidService {
    @Autowired
    private final BidRepository bidRepository;
    @Autowired
    public final ProductService productService;
    @Autowired
    public final PersonService personService;

    public BidService(BidRepository bidRepository,PersonService personService, ProductService productService) {
        this.bidRepository = bidRepository;
        this.personService = personService;
        this.productService = productService;
    }

    public Bid getHighestBid(long productId) {
        return bidRepository.findFirstByProductIdOrderByBidDesc(productId);
    }

    public int getCount(long productId) {
        return bidRepository.countBidsByProductId(productId);
    }

    public void placeBid(BiddingInfoDto biddingInfo) {
        Bid newBid = new Bid();
        Date today = new Date();
        newBid.setProduct(productService.getSelectedProduct(biddingInfo.getProduct()).get());
        newBid.setPerson(personService.getPersonById(biddingInfo.getPerson()));
        newBid.setBid(biddingInfo.getBid());
        newBid.setBidDate(today);
        Bid highestBid = getHighestBid(biddingInfo.getProduct());
        if(highestBid.getBid() >= biddingInfo.getBid()){
            throw new IllegalArgumentException("There are higher bids than yours. You could give a second try!");
        }
        if (highestBid != null && highestBid.getPerson().getId() == biddingInfo.getPerson()) {
            throw new IllegalArgumentException("You cannot outbid yourself!");
        }
        if (newBid.getProduct().getEndingDate().before(today)) {
            throw new DateTimeException("This auction has ended");
        }
        bidRepository.save(newBid);
    }
}

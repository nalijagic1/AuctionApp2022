package com.praksa.auction.dto;

public class BiddingInfoDto {
    private  long product;
    private long person;
    private Double bid;

    public BiddingInfoDto(long product, long person, Double bid) {
        this.product = product;
        this.person = person;
        this.bid = bid;
    }

    public BiddingInfoDto() {
    }

    public long getProduct() {
        return product;
    }

    public void setProduct(long product) {
        this.product = product;
    }

    public long getPerson() {
        return person;
    }

    public void setPerson(long person) {
        this.person = person;
    }

    public Double getBid() {
        return bid;
    }

    public void setBid(Double bid) {
        this.bid = bid;
    }
}

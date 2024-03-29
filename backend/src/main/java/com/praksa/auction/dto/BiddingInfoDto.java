package com.praksa.auction.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BiddingInfoDto {
    private long productId;
    private long personId;
    private Double bid;
}

package com.praksa.auction.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BiddingInfoDto {
    private long product;
    private long person;
    private Double bid;
}

package com.praksa.auction.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Validated
public class BiddingInfoDto {
    @NotEmpty
    private long product;
    @NotEmpty
    private long person;
    @NotEmpty
    private Double bid;
}

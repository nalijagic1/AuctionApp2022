package com.praksa.auction.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class NewProductDto {
    private String productName;
    private String description;
    private long subcategoryId;
    private long personId;
    private Double startingPrice;
    private Date startingDate;
    private Date endingDate;
    private List pictures;
    private long addressId;
    private String phoneNumber;
}

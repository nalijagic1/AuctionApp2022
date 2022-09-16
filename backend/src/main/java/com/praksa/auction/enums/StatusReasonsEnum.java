package com.praksa.auction.enums;


import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum StatusReasonsEnum {
    ADMIN_GRANTED("ِAdmin granted this status."),
    BLACK_LISTED_CARD("The user has provided a card that corresponds to one of the cards that are already placed in Black list."),
    NO_FUND_CARD("The user has twice provided a card with no funds."),
    SUCCESSFUL_MONTH("The user had a high number of successfully completed auctions in the past month. Successfully sold or purchased items."),
    REGULAR(""),
    NON_ACTIVE("The user was not active for more then 6 months");


    private final String statusMessage;
    }

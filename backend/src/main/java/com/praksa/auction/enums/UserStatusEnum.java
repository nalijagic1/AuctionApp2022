package com.praksa.auction.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum UserStatusEnum {
    Admin(0),
    User(1),
    Golden(2),
    Restricted(3),
    Black(4),
    Archived(5);

    private final int statusCode;
}

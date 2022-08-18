package com.praksa.auction.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCodeEnum {
    EMAIL_NOT_FOUND(1),
    DUPLICATE_EMAIL(2);

    private final int errorCode;
}

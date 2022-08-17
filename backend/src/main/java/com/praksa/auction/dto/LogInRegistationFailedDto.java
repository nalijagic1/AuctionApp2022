package com.praksa.auction.dto;

import com.praksa.auction.model.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LogInRegistationFailedDto {
    private ErrorCode field;
    private String message;
}

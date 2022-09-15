package com.praksa.auction.dto;

import com.praksa.auction.enums.SortDirectionEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SortDto {
    private String field;
    private SortDirectionEnum direction;
}

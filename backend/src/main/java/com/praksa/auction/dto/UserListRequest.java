package com.praksa.auction.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserListRequest {
    private int page;
    private int count;
    private List<Integer> filters;
    private SortDto sort;
    private String search;
    private Boolean viewed;
}

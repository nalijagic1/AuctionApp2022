package com.praksa.auction.dto;

import com.praksa.auction.model.Subcategory;

public class SubcategoryDto {
    private long subcategoryId;
    private String name;
    private Integer count;

    public SubcategoryDto(long subcategoryId, String name, Integer count) {
        this.subcategoryId = subcategoryId;
        this.name = name;
        this.count = count;
    }

    public SubcategoryDto() {
    }

    public long getSubcategoryId() {
        return subcategoryId;
    }

    public void setSubcategoryId(long subcategoryId) {
        this.subcategoryId = subcategoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}

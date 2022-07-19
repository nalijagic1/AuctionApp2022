package com.praksa.auction.dto;

import com.praksa.auction.model.Subcategory;

public class SubcategoryDto {
    private long subcategoryId;
    private String name;
    private long count;

    public SubcategoryDto(long subcategoryId, String name, long count) {
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

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}

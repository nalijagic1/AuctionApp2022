package com.praksa.auction.dto;

import com.praksa.auction.model.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {
    private Category category;
    private List<SubcategoryDto> subcategories;
}

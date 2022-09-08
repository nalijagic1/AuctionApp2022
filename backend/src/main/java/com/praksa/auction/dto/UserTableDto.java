package com.praksa.auction.dto;

import com.praksa.auction.model.Person;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserTableDto {
    private List<Person> listOfUsers;
    private Integer numberOfPages;
}

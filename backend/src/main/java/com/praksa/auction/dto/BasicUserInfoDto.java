package com.praksa.auction.dto;

import com.praksa.auction.model.UserStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BasicUserInfoDto {
    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private boolean isSeller;
    private UserStatusEnum role;
}

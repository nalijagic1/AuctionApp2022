package com.praksa.auction.dto;

import com.praksa.auction.model.UserStatusEnum;
import lombok.*;

import java.util.Date;

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
    private Date lastLogIn;
}

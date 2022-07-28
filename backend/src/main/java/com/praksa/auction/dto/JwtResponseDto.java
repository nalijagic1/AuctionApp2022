package com.praksa.auction.dto;

import com.praksa.auction.config.security.services.UserDetailsImpl;
import com.praksa.auction.model.Person;

public class JwtResponseDto {
    private String token;
    private UserDetailsImpl user;

    public JwtResponseDto(String token, UserDetailsImpl user) {
        this.token = token;
        this.user = user;
    }

    public JwtResponseDto() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserDetailsImpl getUser() {
        return user;
    }

    public void setUser(UserDetailsImpl user) {
        this.user = user;
    }
}

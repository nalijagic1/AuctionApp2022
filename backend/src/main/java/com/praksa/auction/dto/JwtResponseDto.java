package com.praksa.auction.dto;

public class JwtResponseDto {
    private String token;
    private BasicUserInfoDto user;

    public JwtResponseDto(String token, BasicUserInfoDto user) {
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

    public BasicUserInfoDto getUser() {
        return user;
    }

    public void setUser(BasicUserInfoDto user) {
        this.user = user;
    }
}

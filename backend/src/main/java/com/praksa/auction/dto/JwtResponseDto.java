package com.praksa.auction.dto;

public class JwtResponseDto {
    private String token;
    private BasicInfoDto user;

    public JwtResponseDto(String token, BasicInfoDto user) {
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

    public BasicInfoDto getUser() {
        return user;
    }

    public void setUser(BasicInfoDto user) {
        this.user = user;
    }
}

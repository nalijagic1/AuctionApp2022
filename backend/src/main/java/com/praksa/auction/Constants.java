package com.praksa.auction;

public final class Constants {
    public static final String EMAIL_REGEX = "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$";
    public static final String PASSWORD_STRONG = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})";
    public static final String LETTERS_ONLY ="^[a-zA-Z]+$";
    public Constants() {
    }
}

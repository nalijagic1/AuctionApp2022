package com.praksa.auction.dto;

public class LogInDto {
    private String email;
    private String password;

    public LogInDto(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public LogInDto() {
    }
    public String validateData(){
        if(email == null){
            return "Email is requered!";
        }else{
            Pattern pattern = Pattern.compile("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$");
            if(!pattern.matcher(email.toLowerCase()).matches()){
                return "Email format is not valid, please try again!";
            }
        }
        if(password == null){
            return "Password is requered!";
        }
        return null;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

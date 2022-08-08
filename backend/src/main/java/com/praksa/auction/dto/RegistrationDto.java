package com.praksa.auction.dto;

public class RegistrationDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    public RegistrationDto(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public RegistrationDto() {
    }
    public String validateRegistration(){
        if(firstName == null){
            return "First name is requered!";
        }else if(!Pattern.compile("^[a-zA-Z]+$").matcher(firstName).matches()){
            return "First name must contain only letters!";
        }
        if(lastName == null){
            return "Last name is requered!";
        }else if(!Pattern.compile("^[a-zA-Z]+$").matcher(lastName).matches()){
            return "Last name must contain only letters!";
        }
        if(email == null){
            return "Email is requered!";
        }else{
            Pattern pattern = Pattern.compile("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$");
            if(!pattern.matcher(email.toLowerCase()).matches()){
                return "Email format is not valid, please try again!";
            }
        }
        if(password == null){
            return  "Password is requered!";
        }else if(Pattern.compile("((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))").matcher(password).matches()){
            return "Your password is week!";
        }
        return null;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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

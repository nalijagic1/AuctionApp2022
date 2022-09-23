package com.praksa.auction.config.security.services;

import com.praksa.auction.enums.GenderEnum;
import com.praksa.auction.enums.UserStatusEnum;
import com.praksa.auction.model.Address;
import com.praksa.auction.model.Person;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PersonDetails implements UserDetails {
    private long id;
    private String firstName;
    private String lastName;
    private GenderEnum genderEnum;
    private Date dateOfBirth;
    private String phoneNumber;
    private String email;
    private String password;
    private String picture;
    private Address address;
    private String customerId;
    private UserStatusEnum status;
    private Date statusUpdate;
    private LocalDate lastLogIn;
    private Date firstLogIn;

    public static PersonDetails build(Person user) {
        return new PersonDetails(user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getGenderEnum(),
                user.getDateOfBirth(),
                user.getPhoneNumber(),
                user.getEmail(),
                user.getPassword(),
                user.getPicture(),
                user.getAddress(),
                user.getCustomerId(),
                user.getStatus(),
                user.getStatusUpdate(),
                user.getLastLogIn(),
                user.getFirstLogIn());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}



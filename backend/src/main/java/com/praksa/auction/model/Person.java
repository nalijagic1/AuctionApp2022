package com.praksa.auction.model;

import com.praksa.auction.enums.GenderEnum;
import com.praksa.auction.enums.UserStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "person")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String firstName;
    private String lastName;
    private GenderEnum genderEnum;
    private Date dateOfBirth;
    private String phoneNumber;
    private String email;
    private String password;
    private String picture;
    @ManyToOne
    @JoinColumn(name = "addressId")
    private Address address;
    private String customerId;
    private UserStatusEnum status;
    private Date statusUpdate;
    private Date lastLogIn;
    private Date firstLogIn;
    private String statusReason;

    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", genderEnum=" + genderEnum +
                ", dateOfBirth=" + dateOfBirth +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", picture='" + picture + '\'' +
                ", address=" + address +
                ", customerId='" + customerId + '\'' +
                ", status=" + status +
                ", statusUpdate=" + statusUpdate +
                ", lastLogIn=" + lastLogIn +
                ", firstLogIn=" + firstLogIn +
                ", statusReason='" + statusReason + '\'' +
                '}';
    }
}

package com.praksa.auction.model;

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
    private Gender gender;
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
    private Date statusUpade;
    private Date lastLogIn;
    private Date firstLogIn;
}

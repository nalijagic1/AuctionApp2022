package com.praksa.auction.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="card")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="cardOwner")
    private String cardOwner;
    @Column(name="cardNumber")
    private String cardNumber;
    @Column(name = "expirationDate")
    private Date expirationDate;
    @Column(name = "cvc")
    private Integer cvc;
    @OneToOne(mappedBy = "card", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Person person;

    public Card( String cardOwner, String cardNumber, Date expirationDate, Integer cvc) {
        this.cardOwner = cardOwner;
        this.cardNumber = cardNumber;
        this.expirationDate = expirationDate;
        this.cvc = cvc;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCardOwner() {
        return cardOwner;
    }

    public void setCardOwner(String cardOwner) {
        this.cardOwner = cardOwner;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    public Integer getCvc() {
        return cvc;
    }

    public void setCvc(Integer cvc) {
        this.cvc = cvc;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}

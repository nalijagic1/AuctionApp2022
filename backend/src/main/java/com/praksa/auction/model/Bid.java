package com.praksa.auction.model;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="bid")
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "productId")
    private Product product;
    @ManyToOne
    @JoinColumn(name = "personId")
    private Person person;
    private Double bid;
    private Date bidDate;

    public Bid(Product product, Person person, Double bid, Date bidDate) {
        this.product = product;
        this.person = person;
        this.bid = bid;
        this.bidDate = bidDate;
    }

    public Bid() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Double getBid() {
        return bid;
    }

    public void setBid(Double bid) {
        this.bid = bid;
    }

    public Date getBidDate() {
        return bidDate;
    }

    public void setBidDate(Date bidDate) {
        this.bidDate = bidDate;
    }

    @Override
    public String toString() {
        return "Bid{" +
                "id=" + id +
                ", product=" + product +
                ", person=" + person +
                ", bid=" + bid +
                ", bidDate=" + bidDate +
                '}';
    }
}

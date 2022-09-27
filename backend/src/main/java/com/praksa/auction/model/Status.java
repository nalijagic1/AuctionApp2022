package com.praksa.auction.model;

import com.praksa.auction.enums.StatusReasonsEnum;
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
@Table(name = "status")
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private UserStatusEnum status;
    private StatusReasonsEnum reason;
    private Boolean viewed;
    private Date statusUpdate;

    public Status(UserStatusEnum status, StatusReasonsEnum reason, Boolean viewed, Date statusUpdate) {
        this.status = status;
        this.reason = reason;
        this.viewed = viewed;
        this.statusUpdate = statusUpdate;
    }
}

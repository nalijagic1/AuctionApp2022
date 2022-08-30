package com.praksa.auction.repository;

import com.praksa.auction.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, Long> {
    Optional<Person> findByEmail(String email);

    Boolean existsByEmail(String email);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE Person SET customer_id = :customerId WHERE id = :userId", nativeQuery = true)
    void updateCustomerInfo(String customerId, long userId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE Person SET address_id = :addressId WHERE id = :userId", nativeQuery = true)
    void updateAddressInfo(long addressId, long userId);
}

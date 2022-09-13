package com.praksa.auction.repository;

import com.praksa.auction.model.Person;
import com.praksa.auction.model.UserStatusEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.sql.In;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
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

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE Person SET last_log_in = CURRENT_DATE WHERE id = :userId", nativeQuery = true)
    void updateLastLogIn(long userId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE Person SET status_update = CURRENT_DATE,status=:status WHERE id IN :userId", nativeQuery = true)
    void updateStatus(int status, List<Integer> userId);

    @Query(value = "SELECT * FROM PERSON WHERE status != 0",nativeQuery = true)
    Page<Person> findAllUsers(Pageable pageable);

    @Query(value = "SELECT * FROM PERSON p WHERE status != 0 AND p.first_name ILIKE '%' || :search  || '%' OR p.last_name ILIKE '%' || :search  || '%' OR p.email ILIKE '%' || :search  || '%'",nativeQuery = true)
    Page<Person> searchAllUsers(Pageable pageable,String search);
    @Query(value = "SELECT * FROM PERSON WHERE status in :status",nativeQuery = true)
    Page<Person> findAllFilteredUsers(Pageable pageable,List<Integer> status);

    @Query(value = "SELECT * FROM PERSON p WHERE p.status in :status AND p.first_name ILIKE '%' || :search  || '%' OR p.last_name ILIKE '%' || :search  || '%' OR p.email ILIKE '%' || :search  || '%'",nativeQuery = true)
    Page<Person> searchAllFilteredUsers(Pageable pageable,String search,List<Integer> status);
}

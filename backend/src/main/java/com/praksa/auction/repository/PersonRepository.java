package com.praksa.auction.repository;

import com.praksa.auction.enums.UserStatusEnum;
import com.praksa.auction.model.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

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
    @Query(value = "UPDATE Person SET status_update = CURRENT_DATE,status=:status,status_reason = :statusMessage,viewed_status = :viewedStatus WHERE id IN :userId", nativeQuery = true)
    void updateStatus(int status, List<Long> userId, String statusMessage,boolean viewedStatus);

    @Query(value = "SELECT * FROM PERSON p WHERE p.status != 0 AND (p.first_name ILIKE '%' || :search  || '%' OR p.last_name ILIKE '%' || :search  || '%' OR p.email ILIKE '%' || :search  || '%')", nativeQuery = true)
    Page<Person> searchAllUsers(Pageable pageable, String search);


    @Query(value = "SELECT * FROM PERSON p WHERE p.status in :status AND (p.first_name ILIKE '%' || :search  || '%' OR p.last_name ILIKE '%' || :search  || '%' OR p.email ILIKE '%' || :search  || '%') AND (:viewed is null or p.viewed_status = :viewed)", nativeQuery = true)
    Page<Person> searchAllFilteredUsers(Pageable pageable, String search, List<Integer> status,Boolean viewed);

    @Query(value = "SELECT COUNT(p.id) FROM person p WHERE  NOT p.viewed_status AND p.status =:status", nativeQuery = true)
    Integer countUpdatedUsersByStatus(Integer status);

    List<Person> findPersonByStatus(UserStatusEnum status);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE Person SET viewed_status = :viewedStatus WHERE status=:status",nativeQuery = true)
    void updateViewedStatus(Integer status, Boolean viewedStatus);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE Person SET password = :encodedPassword WHERE email=:email",nativeQuery = true)
    void changePassword(String email, String encodedPassword);
}

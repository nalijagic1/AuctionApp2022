package com.praksa.auction.config.schedul;

import com.praksa.auction.enums.StatusReasonsEnum;
import com.praksa.auction.enums.UserStatusEnum;
import com.praksa.auction.model.Person;
import com.praksa.auction.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDate;
import java.time.Period;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableScheduling
public class PersonScheduler {
    @Autowired
    private PersonService personService;

    @Scheduled(cron = "0 0 0 * * *")
    public void lookForArchived() {
        List<Person> regularUsers = personService.getAllUsersWithStatus(UserStatusEnum.User);
        LocalDate now = LocalDate.now();
        for (Person person : regularUsers) {
            Period difference = Period.between(person.getLastLogIn(), now);
            if (Math.abs(difference.getMonths()) >= 6) {
                personService.updateUserStatus(UserStatusEnum.Archived.getStatusCode(), Arrays.asList(person.getId()), StatusReasonsEnum.NON_ACTIVE.getStatusMessage());
            }
        }
    }

}

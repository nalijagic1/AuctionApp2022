package com.praksa.auction.config.schedul;

import com.praksa.auction.enums.StatusReasonsEnum;
import com.praksa.auction.enums.UserStatusEnum;
import com.praksa.auction.model.Person;
import com.praksa.auction.repository.BidRepository;
import com.praksa.auction.repository.ProductRepository;
import com.praksa.auction.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableScheduling
public class PersonScheduler {
    @Autowired
    private PersonService personService;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private BidRepository bidRepository;

    @Scheduled(cron = "0 0 0 * * *")
    public void lookForArchived() {
        List<Person> regularUsers = personService.getAllUsersWithStatus(UserStatusEnum.User);
        LocalDate now = LocalDate.now();
        List<Long> archivedId = new ArrayList<>();
        for (Person person : regularUsers) {
            Period difference = Period.between(person.getLastLogIn(), now);
            if (Math.abs(difference.getMonths()) >= 6) {
                archivedId.add(person.getId());
            }
        }
        personService.updateUserStatus(UserStatusEnum.Archived.getStatusCode(), archivedId, StatusReasonsEnum.NON_ACTIVE.getStatusMessage());
    }

    private Double calculateSuccessPercentage(long userId) {
        Integer sellCount = productRepository.countProductByPersonId(userId);
        Integer bidCount = bidRepository.countBidsByPersonId(userId);
        Integer highestBidderCount = bidRepository.countHighestBidder(userId);
        Integer successfulSellCount = productRepository.countSuccesfullySold(userId);
        Double successPercentage = ((double) (highestBidderCount + successfulSellCount)) / (sellCount + bidCount);
        return successPercentage * 100;
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void rewardWithGoldenStatus() {
        List<Person> regularUsers = personService.getAllUsersWithStatus(UserStatusEnum.User);
        LocalDate now = LocalDate.now();
        List<Long> goldenId = new ArrayList<>();
        for (Person person : regularUsers) {
            Period difference = Period.between(person.getStatusUpdate(), now);
            if (Math.abs(difference.getMonths()) < 3) {
                continue;
            }
            if (calculateSuccessPercentage(person.getId()) >= 5) {
                goldenId.add(person.getId());
            }
            personService.updateUserStatus(UserStatusEnum.Golden.getStatusCode(), goldenId, StatusReasonsEnum.SUCCESSFUL_MONTH.getStatusMessage());
        }
    }

}

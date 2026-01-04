package project.shop.domain.user.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;
import project.shop.domain.user.dto.response.UserResponse;
import project.shop.domain.user.dto.search.UserSearchCondition;
import project.shop.domain.user.entity.User;
import project.shop.domain.user.enums.Grade;
import project.shop.domain.user.repository.UserRepository;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.tuple;
import static org.junit.jupiter.api.Assertions.*;

@Transactional
@SpringBootTest
class UserServiceTest {

    @Autowired private UserRepository userRepository;

    @BeforeEach
    void setUp(){
        User user1 = User.createUser(
                "user01",
                "password01!",
                "user01@test.com",
                "홍길동",
                Grade.NORMAL,
                'N',
                LocalDateTime.now().minusDays(10),
                LocalDateTime.now().minusDays(1)
        );
        User user2 = User.createUser(
                "user02",
                "password02!",
                "user02@test.com",
                "김철수",
                Grade.NORMAL,
                'N',
                LocalDateTime.now().minusDays(20),
                LocalDateTime.now().minusDays(2)
        );
        User user3 = User.createUser(
                "user03",
                "password03!",
                "user03@test.com",
                "이영희",
                Grade.NORMAL,
                'Y',
                LocalDateTime.now().minusDays(30),
                LocalDateTime.now().minusDays(5)
        );
        User user4 = User.createUser(
                "user04",
                "password04!",
                "user04@test.com",
                "박민수",
                Grade.VIP,
                'N',
                LocalDateTime.now().minusDays(5),
                LocalDateTime.now().minusHours(3)
        );
        User user5 = User.createUser(
                "user05",
                "password05!",
                "user05@test.com",
                "최지은",
                Grade.VIP,
                'Y',
                LocalDateTime.now().minusDays(100),
                LocalDateTime.now().minusDays(1)
        );

        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);
        userRepository.save(user4);
        userRepository.save(user5);
    }


    @Test
    void 전체_회원_조회(){
        String loginId = "user05";
        String userName = "최지은";
        Grade grade = Grade.VIP;
        LocalDateTime withdrawAtFrom = LocalDateTime.now().minusDays(130);
        LocalDateTime withdrawAtTo = LocalDateTime.now().minusDays(100);
        LocalDateTime lastLoginAtFrom = LocalDateTime.now().minusDays(10);
        LocalDateTime lastLoginAtTo = LocalDateTime.now().minusDays(1);

        UserSearchCondition condition = new UserSearchCondition(loginId, userName, grade, withdrawAtFrom, withdrawAtTo, lastLoginAtFrom, lastLoginAtTo);

        PageRequest pageable = PageRequest.of(0, 3);

        Page<UserResponse> allUsers = userRepository.findAllUsers(condition, pageable);
        assertThat(allUsers.getTotalPages()).isEqualTo(1);
        assertThat(allUsers.getTotalElements()).isEqualTo(1);
        assertThat(allUsers.getNumber()).isEqualTo(0);
        assertThat(allUsers.getSize()).isEqualTo(3);
        assertThat(allUsers.getContent())
                .hasSize(1)
                .extracting(
                        UserResponse::loginId,
                        UserResponse::userName,
                        UserResponse::grade
                )
                .containsExactly(
                        tuple("user05", "최지은", Grade.VIP)
                );
    }
}
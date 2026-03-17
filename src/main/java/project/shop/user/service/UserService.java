package project.shop.user.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.shop.user.dto.response.UserResponse;
import project.shop.user.dto.search.UserSearchCondition;
import project.shop.user.entity.User;
import project.shop.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true) // JPA는 트랜잭션 안에서 작동해야함
public class UserService {

    private final UserRepository userRepository;

    @PersistenceContext
    private EntityManager em; // 스프링이 알아서 넣어줌

    @Transactional(readOnly = false)
    public void saveUser() {
        User user = User.createUser();
        em.persist(user);
    }

    public Page<UserResponse> findAllUsers(UserSearchCondition condition, Pageable pageable) {
        return userRepository.findAll(condition, pageable);
    }

}

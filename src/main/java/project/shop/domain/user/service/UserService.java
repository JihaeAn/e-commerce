package project.shop.domain.user.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import project.shop.domain.user.entity.User;

@Service
@Transactional // JPA는 트랜잭션 안에서 작동해야함
public class UserService {

    @PersistenceContext
    private EntityManager em; // 스프링이 알아서 넣어줌

    public void saveUser() {
        User user = User.createUser();
        em.persist(user);
    }
}

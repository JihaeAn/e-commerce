package project.shop.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.shop.domain.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> , UserRepositoryCustom{
}

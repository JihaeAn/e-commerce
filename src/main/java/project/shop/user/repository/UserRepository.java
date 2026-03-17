package project.shop.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.shop.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {
}

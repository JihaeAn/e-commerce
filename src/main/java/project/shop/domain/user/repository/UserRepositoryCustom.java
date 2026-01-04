package project.shop.domain.user.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import project.shop.domain.user.dto.response.UserResponse;
import project.shop.domain.user.dto.search.UserSearchCondition;
import project.shop.domain.user.entity.User;

import java.util.List;

public interface UserRepositoryCustom {

    public List<User> findUserOrderByLastLoginAt();

    public Page<UserResponse> findAllUsers(UserSearchCondition condition, Pageable pageable);
}

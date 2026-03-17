package project.shop.user.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import project.shop.user.dto.response.UserResponse;
import project.shop.user.dto.search.UserSearchCondition;
import project.shop.user.entity.User;

import java.util.List;

public interface UserRepositoryCustom {

    Page<UserResponse> findAll(UserSearchCondition condition, Pageable pageable);
}

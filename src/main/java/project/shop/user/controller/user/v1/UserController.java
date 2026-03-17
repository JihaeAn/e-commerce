package project.shop.user.controller.user.v1;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.shop.user.dto.response.UserResponse;
import project.shop.user.dto.search.UserSearchCondition;
import project.shop.user.entity.User;
import project.shop.user.service.UserService;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<User> signInUser() {
        userService.saveUser();
        return ResponseEntity.ok().build();
    }

    // username=kim&ageGoe=20&page=0&size=20&sort=age,desc
    @GetMapping
    public Page<UserResponse> getUsers(UserSearchCondition condition,
                                       @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable){
        return userService.findAllUsers(condition, pageable);
    }
}

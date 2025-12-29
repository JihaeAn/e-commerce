package project.shop.domain.user.controller.v1;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import project.shop.domain.user.entity.User;
import project.shop.domain.user.service.UserService;

@Controller
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<User> signInUser() {
        userService.saveUser();
        return ResponseEntity.ok().build();
    }
}

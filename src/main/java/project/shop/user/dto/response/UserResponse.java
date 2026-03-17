package project.shop.user.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import project.shop.user.entity.User;
import project.shop.user.enums.Grade;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record UserResponse(
        Long userId,
        String loginId,
        String email,
        String userName,
        String phone,
        String gender,
        LocalDate birthDate,
        Grade grade,
        LocalDateTime lastLoginAt
) {
    @QueryProjection
    public UserResponse{

    }

    public static UserResponse from(User user){
        return new UserResponse(
                user.getUserId(),
                user.getLoginId(),
                user.getEmail(),
                user.getUserName(),
                user.getPhone(),
                user.getGender(),
                user.getBirthDate(),
                user.getGrade(),
                user.getLastLoginAt()
        );
    }
}

package project.shop.user.dto.search;

import project.shop.user.enums.Grade;

import java.time.LocalDateTime;

public record UserSearchCondition(
        String loginId,
        String userName,
        Grade grade,
        LocalDateTime withdrawAtFrom,
        LocalDateTime withdrawAtTo,
        LocalDateTime lastLoginAtFrom,
        LocalDateTime lastLoginAtTo
) {
}

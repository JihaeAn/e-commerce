package project.shop.domain.user.dto.search;

import project.shop.domain.user.enums.Grade;

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

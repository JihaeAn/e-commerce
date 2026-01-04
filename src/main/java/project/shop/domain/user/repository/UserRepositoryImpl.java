package project.shop.domain.user.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;
import project.shop.domain.user.dto.response.QUserResponse;
import project.shop.domain.user.dto.response.UserResponse;
import project.shop.domain.user.dto.search.UserSearchCondition;
import project.shop.domain.user.entity.QUser;
import project.shop.domain.user.entity.User;
import project.shop.domain.user.enums.Grade;

import java.time.LocalDateTime;
import java.util.List;

import static project.shop.domain.user.entity.QUser.*;


@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<User> findUserOrderByLastLoginAt() {
        return jpaQueryFactory
                .selectFrom(user)
                .orderBy(user.lastLoginAt.asc())
                .fetch();
    }

    @Override
    public Page<UserResponse> findAllUsers(UserSearchCondition condition, Pageable pageable) {
        List<UserResponse> users = jpaQueryFactory
                .select(new QUserResponse(
                                user.userId,
                                user.loginId,
                                user.email,
                                user.userName,
                                user.phone,
                                user.gender,
                                user.birthDate,
                                user.grade,
                                user.lastLoginAt
                        )
                )
                .from(user)
                .where(
                        loginIdEq(condition.loginId()),
                        userNameEq(condition.userName()),
                        gradeEq(condition.grade()),
                        withdrawAtBetween(condition.withdrawAtFrom(), condition.withdrawAtTo()),
                        lastLoginAtBetween(condition.lastLoginAtFrom(), condition.lastLoginAtTo())
                )
                .orderBy(user.lastLoginAt.asc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long totalCount = jpaQueryFactory
                .select(user.count())
                .from(user)
                .where(
                        loginIdEq(condition.loginId()),
                        userNameEq(condition.userName()),
                        gradeEq(condition.grade()),
                        withdrawAtBetween(condition.withdrawAtFrom(), condition.withdrawAtTo()),
                        lastLoginAtBetween(condition.lastLoginAtFrom(), condition.lastLoginAtTo())
                )
                .fetchOne();

        return new PageImpl<>(users,pageable,totalCount);

    }


    private BooleanExpression loginIdEq(String loginId) {
        return StringUtils.hasText(loginId) ? user.loginId.eq(loginId) : null;
    }

    private BooleanExpression userNameEq(String userName) {
        return StringUtils.hasText(userName) ? user.userName.eq(userName) : null;
    }

    private BooleanExpression gradeEq(Grade grade) {
        return grade != null ? user.grade.eq(grade) : null;
    }

    private BooleanExpression withdrawAtBetween(
            LocalDateTime from,
            LocalDateTime to
    ) {
        if (from == null && to == null) {
            return null;
        }
        if (from != null && to != null) {
            return user.withdrawAt.between(from, to);
        }
        if (from != null) {
            return user.withdrawAt.goe(from);
        }
        return user.withdrawAt.loe(to);
    }

    private BooleanExpression lastLoginAtBetween(
            LocalDateTime from,
            LocalDateTime to
    ) {
        if (from == null && to == null) {
            return null;
        }
        if (from != null && to != null) {
            return user.lastLoginAt.between(from, to);
        }
        if (from != null) {
            return user.lastLoginAt.goe(from);
        }
        return user.lastLoginAt.loe(to);
    }









}

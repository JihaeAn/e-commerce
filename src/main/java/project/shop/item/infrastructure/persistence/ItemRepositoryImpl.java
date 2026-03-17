package project.shop.item.infrastructure.persistence;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import project.shop.item.domain.entity.Item;
import project.shop.item.domain.entity.QItem;
import project.shop.item.domain.entity.QItemImage;
import project.shop.item.domain.entity.QItemOptionGroup;
import project.shop.item.domain.enums.Status;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class ItemRepositoryImpl implements ItemRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Item> findItems(String itemName, Status status, Pageable pageable) {
        QItem item = QItem.item;

        BooleanBuilder condition = new BooleanBuilder();

        if (itemName != null && !itemName.isBlank()) {
            condition.and(item.itemName.containsIgnoreCase(itemName));
        }
        if (status != null) {
            condition.and(item.status.eq(status));
        }
        condition.and(item.status.ne(Status.DELETED));

        List<Item> items = queryFactory
                .selectFrom(item)
                .where(condition)
                .orderBy(item.itemId.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(item.count())
                .from(item)
                .where(condition);

        return PageableExecutionUtils.getPage(items, pageable, countQuery::fetchOne);
    }

    @Override
    public Page<Item> findActiveItems(Integer categoryId, Pageable pageable) {
        QItem item = QItem.item;

        BooleanBuilder condition = new BooleanBuilder();
        condition.and(item.status.eq(Status.ACTIVE));

        if (categoryId != null) {
            condition.and(item.categoryId.eq(categoryId));
        }

        List<Item> items = queryFactory
                .selectFrom(item)
                .where(condition)
                .orderBy(item.itemId.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(item.count())
                .from(item)
                .where(condition);

        return PageableExecutionUtils.getPage(items, pageable, countQuery::fetchOne);
    }

    @Override
    public Optional<Item> findActiveItemById(Long itemId) {
        QItem item = QItem.item;
        QItemOptionGroup optionGroup = QItemOptionGroup.itemOptionGroup;

        Item result = queryFactory
                .selectFrom(item)
                .leftJoin(item.optionGroups, optionGroup).fetchJoin()
//              images는 BatchSize로 처리
                .where(
                        item.itemId.eq(itemId),
                        item.status.eq(Status.ACTIVE)
                )
                .fetchOne();

        return Optional.ofNullable(result);
    }
}
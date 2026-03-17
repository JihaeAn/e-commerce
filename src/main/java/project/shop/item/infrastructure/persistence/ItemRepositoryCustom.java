package project.shop.item.infrastructure.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import project.shop.item.domain.entity.Item;
import project.shop.item.domain.enums.Status;

import java.util.Optional;

public interface ItemRepositoryCustom {
    Page<Item> findItems(String itemName, Status status, Pageable pageable);
    Page<Item> findActiveItems(Integer categoryId, Pageable pageable);
    Optional<Item> findActiveItemById(Long itemId);
}

package project.shop.item.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import project.shop.item.domain.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long>, ItemRepositoryCustom {
}

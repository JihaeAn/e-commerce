package project.shop.item.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import project.shop.item.domain.entity.ItemOptionGroup;

public interface ItemOptionGroupRepository extends JpaRepository<ItemOptionGroup, Long> {
}

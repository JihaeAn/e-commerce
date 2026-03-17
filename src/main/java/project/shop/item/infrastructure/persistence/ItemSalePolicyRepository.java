package project.shop.item.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import project.shop.item.domain.entity.ItemSalePolicy;

public interface ItemSalePolicyRepository extends JpaRepository<ItemSalePolicy, Long> {
}

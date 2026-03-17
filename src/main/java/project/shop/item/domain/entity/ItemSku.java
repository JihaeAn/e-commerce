package project.shop.item.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.shop.global.entity.BaseEntity;

@Entity
@Table(name = "TB_ITEM_SKU")
@Getter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ItemSku extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_option_id")
    private Long itemOptionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Column(name = "option_name")
    private String optionName;

    @Column(name = "stock_quantity")
    private Integer stockQuantity;

    @Column(name = "additional_price")
    private Integer additionalPrice;

    // 재고가 0될 때 같이 업데이트 x
    // 해당 옵션의 제품을 더이상 팔건지 안 팔건지 판매자가 결정하는 컬럼
    @Column(name = "is_active")
    private Boolean isActive;
}

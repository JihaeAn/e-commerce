package project.shop.order.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.shop.item.domain.entity.ItemSku;
import project.shop.global.entity.BaseEntity;

@Entity
@Table(name = "TB_ORDER_ITEM")
@Getter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private Long orderItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    // 얘도 굳이 연관관계를 설정해주어야 하나 고민했지만
    // (재고 관리 + 통계 용이) 등에 유용할 것으로 예상됨
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_option_id", nullable = false)
    private ItemSku itemSku;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "option_name")
    private String optionName;

    @Column(name = "original_unit_price")
    private Integer originalUnitPrice;

    @Column(name = "sale_unit_price")
    private Integer saleUnitPrice;

    @Column(name = "total_unit_additional_price")
    private Integer totalUnitAdditionalPrice;

    @Column(name = "total_unit_price")
    private Integer totalUnitPrice;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "order_item_status")
    private String orderItemStatus; // todo: enum으로 변경

    @Column(name = "review_written")
    private String reviewWritten;
}

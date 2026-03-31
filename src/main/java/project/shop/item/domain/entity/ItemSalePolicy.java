package project.shop.item.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.shop.item.domain.command.CreateItemSalePolicyCommand;
import project.shop.item.domain.enums.ActiveYn;
import project.shop.item.domain.enums.PolicyType;
import project.shop.global.entity.BaseEntity;

import java.time.LocalDateTime;

@Entity
@Table(name = "TB_ITEM_SALE_POLICY")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ItemSalePolicy extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "policy_id")
    private Long itemSalePolicyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Column(name = "policy_type")
    @Enumerated(value = EnumType.STRING)
    private PolicyType policyType;

    @Column(name = "origin_price")
    private Integer originPrice;

    @Column(name = "sale_price")
    private Integer salePrice;

    @Column(name = "sale_percent")
    private Integer salePercent;

    @Column(name = "sale_start_at")
    private LocalDateTime saleStartAt;

    @Column(name = "sale_end_at")
    private LocalDateTime saleEndAt;

    @Column(name = "is_active")
    private Boolean isActive;

    public static ItemSalePolicy create(Item item, CreateItemSalePolicyCommand command) {
        // 상품을 최초로 등록할 땐 제외지만, 정책의 날짜가 겹쳐서는 안된다는 점을 고려하자.

        ItemSalePolicy policy = new ItemSalePolicy();
        policy.item = item;
        policy.policyType = command.policyType();
        policy.originPrice = command.originPrice();
        policy.salePrice = command.salePrice();
        policy.salePercent = policy.calculateSalePercent(
                command.originPrice(), command.salePrice()
        );
        policy.saleStartAt = command.saleStartAt();
        policy.saleEndAt = command.saleEndAt();
        policy.isActive = true;
        return policy;
    }

    private int calculateSalePercent(Integer originPrice, Integer salePrice) {
        if (originPrice == null || salePrice == null || originPrice == 0) {
            return 0;
        }

        double discount = (double) (originPrice - salePrice) / originPrice * 100;

        return (int) discount;
    }

}
package project.shop.domain.item.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.shop.domain.item.enums.PolicyType;
import project.shop.global.entity.BaseEntity;

import java.time.LocalDateTime;

@Entity
@Table(name = "TB_ITEM_SALE_POLICY")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
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

    @Column(name = "sale_price")
    private Integer salePrice;

    @Column(name = "sale_start_at")
    private LocalDateTime saleStartAt;

    @Column(name = "sale_end_at")
    private LocalDateTime saleEndAt;

    @Column(name = "is_active")
    private String isActive;

}

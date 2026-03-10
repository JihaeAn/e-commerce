package project.shop.domain.item.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.shop.global.entity.BaseEntity;

@Entity
@Table(name = "TB_ITEM_OPTION_VALUE")
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ItemOptionValue extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "option_value_id")
    private Long optionValueId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "option_group_id", nullable = false)
    private ItemOptionGroup optionGroup;

    @Column(name = "value_name")
    private String valueName;

    @Column(name = "additional_price")
    private Integer additionalPrice;

    @Column(name = "sort_order")
    private int sortOrder;
}

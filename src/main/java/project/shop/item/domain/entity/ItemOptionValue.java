package project.shop.item.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.shop.item.domain.command.CreateItemOptionGroupValueCommand;
import project.shop.global.entity.BaseEntity;

@Entity
@Table(name = "TB_ITEM_OPTION_VALUE")
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
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

    // todo: 나중에 색상 코드도 넣을 예정

    public static ItemOptionValue create(ItemOptionGroup optionGroup, CreateItemOptionGroupValueCommand command) {
        validate(optionGroup, command);

        ItemOptionValue value = new ItemOptionValue();
        value.optionGroup = optionGroup;
        value.valueName = command.valueName();
        value.additionalPrice = command.additionalPrice();
        value.sortOrder = command.sortOrder();
        return value;
    }

    private static void validate(ItemOptionGroup optionGroup, CreateItemOptionGroupValueCommand command) {
        if (optionGroup == null)
            throw new IllegalArgumentException("옵션 그룹은 필수입니다.");
        if (command.valueName() == null || command.valueName().isBlank())
            throw new IllegalArgumentException("옵션 값 이름은 필수입니다.");
        if (command.additionalPrice() == null)
            throw new IllegalArgumentException("추가 가격은 필수입니다.");
        if (command.additionalPrice() < 0)
            throw new IllegalArgumentException("추가 가격은 0 이상이어야 합니다.");
        if (command.sortOrder() < 0)
            throw new IllegalArgumentException("정렬 순서는 0 이상이어야 합니다.");
    }
}
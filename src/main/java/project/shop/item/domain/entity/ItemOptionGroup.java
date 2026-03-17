package project.shop.item.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;
import project.shop.item.domain.command.CreateItemOptionGroupCommand;
import project.shop.global.entity.BaseEntity;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "TB_ITEM_OPTION_GROUP")
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ItemOptionGroup extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "option_group_id")
    private Long optionGroupId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Column(name = "group_name")
    private String groupName;

    @Column(name = "sort_order")
    private int sortOrder;

    @OneToMany(mappedBy = "optionGroup", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemOptionValue> values = new ArrayList<>();

    public static ItemOptionGroup create(Item item, CreateItemOptionGroupCommand command) {
        validate(item, command);

        ItemOptionGroup group = new ItemOptionGroup();
        group.item = item;
        group.groupName = command.groupName();
        group.sortOrder = command.sortOrder();
        group.values = new ArrayList<>();
        command.values().forEach(valueCommand ->
                group.values.add(ItemOptionValue.create(group, valueCommand))
        );
        return group;
    }

    private static void validate(Item item, CreateItemOptionGroupCommand command) {
        if (item == null)
            throw new IllegalArgumentException("상품은 필수입니다.");
        if (command.groupName() == null || command.groupName().isBlank())
            throw new IllegalArgumentException("옵션 그룹명은 필수입니다.");
        if (command.sortOrder() < 0)
            throw new IllegalArgumentException("정렬 순서는 0 이상이어야 합니다.");
        if (command.values() == null || command.values().isEmpty())
            throw new IllegalArgumentException("옵션 그룹에는 하나 이상의 옵션 값이 있어야 합니다.");
    }
}
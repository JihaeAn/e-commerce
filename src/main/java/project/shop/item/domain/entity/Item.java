package project.shop.item.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.shop.item.domain.command.CreateItemCommand;
import project.shop.item.domain.command.CreateItemImageCommand;
import project.shop.item.domain.command.CreateItemOptionGroupCommand;
import project.shop.item.domain.command.CreateItemOptionGroupValueCommand;
import project.shop.item.domain.enums.ImageType;
import project.shop.item.domain.enums.Status;
import project.shop.global.entity.BaseEntity;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "TB_ITEM")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Item extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "category_id", nullable = false)
    private int categoryId;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Integer price;

    @Column(name = "status")
    @Enumerated(value = EnumType.STRING)
    private Status status;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemOptionGroup> optionGroups = new ArrayList<>();

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemSku> skus = new ArrayList<>();

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemSalePolicy> salePolicies = new ArrayList<>();

    public static Item create(CreateItemCommand command) {
        validate(command);

        Item item = new Item();
        item.categoryId = command.categoryId();
        item.itemName = command.itemName();
        item.description = command.description();
        item.price = command.price();
        item.status = command.status();
        return item;
    }

    public void addImages(List<CreateItemImageCommand> commands) {
        validateImages(commands);
        commands.forEach(command ->
                this.images.add(ItemImage.create(
                        this,
                        command.imageType(),
                        command.fileUrl(),
                        command.originalName(),
                        command.sortOrder()))
        );
    }

    public void addOptionGroups(List<CreateItemOptionGroupCommand> commands) {
        validateGroupOptions(commands);
        commands.forEach(command ->
                this.optionGroups.add(ItemOptionGroup.create(this, command))
        );
    }

    private static void validate(CreateItemCommand command) {
        if (command.categoryId() <= 0)
            throw new IllegalArgumentException("카테고리 ID는 0보다 커야 합니다.");
        if (command.itemName() == null || command.itemName().isBlank())
            throw new IllegalArgumentException("상품명은 필수입니다.");
        if (command.price() == null)
            throw new IllegalArgumentException("가격은 필수입니다.");
        if (command.price() <= 0)
            throw new IllegalArgumentException("가격은 0보다 커야 합니다.");
        if (command.status() == null)
            throw new IllegalArgumentException("상품 상태는 필수입니다.");
    }

    public static void validateGroupOptions(List<CreateItemOptionGroupCommand> groups) {
        if (groups == null)
            throw new IllegalArgumentException("옵션 그룹 목록은 null일 수 없습니다.");
        for (CreateItemOptionGroupCommand group : groups) {
            if (group.groupName() == null || group.groupName().isBlank())
                throw new IllegalArgumentException("옵션 그룹명은 필수입니다.");
            if (group.sortOrder() < 0)
                throw new IllegalArgumentException("옵션 그룹 정렬 순서는 0 이상이어야 합니다.");
            if (group.values() == null || group.values().isEmpty())
                throw new IllegalArgumentException("옵션 그룹에는 하나 이상의 옵션 값이 있어야 합니다.");
            for (CreateItemOptionGroupValueCommand value : group.values()) {
                if (value.valueName() == null || value.valueName().isBlank())
                    throw new IllegalArgumentException("옵션 값 이름은 필수입니다.");
                if (value.additionalPrice() == null)
                    throw new IllegalArgumentException("옵션 값 추가 가격은 필수입니다.");
                if (value.additionalPrice() < 0)
                    throw new IllegalArgumentException("옵션 값 추가 가격은 0 이상이어야 합니다.");
                if (value.sortOrder() < 0)
                    throw new IllegalArgumentException("옵션 값 정렬 순서는 0 이상이어야 합니다.");
            }
        }
    }

    private static void validateImages(List<CreateItemImageCommand> commands) {
        if (commands == null || commands.isEmpty())
            throw new IllegalArgumentException("이미지는 최소 1개 이상이어야 합니다.");
        boolean hasMain = commands.stream()
                .anyMatch(c -> c.imageType() == ImageType.MAIN);
        if (!hasMain)
            throw new IllegalArgumentException("대표 이미지는 필수입니다.");
    }
}
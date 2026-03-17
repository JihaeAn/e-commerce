package project.shop.item.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.shop.global.entity.BaseEntity;

@Entity
@Table(name = "TB_ITEM_IMAGE")
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ItemImage extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_image_id")
    private Long itemImageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Column(name = "image_type")
    private String imageType; // todo: enum으로 변경

    @Column(name = "file_url")
    private String fileUrl;

    @Column(name = "original_name")
    private String originalName;

    @Column(name = "sort_order")
    private int sortOrder;

    @Column(name = "is_active")
    private Boolean isActive;

    public static ItemImage create(Item item,
                                   String imageType,
                                   String fileUrl,
                                   String originalName,
                                   int sortOrder) {
        // 필요한 validation 추가
        ItemImage image = new ItemImage();
        image.item = item;
        image.imageType = imageType;
        image.fileUrl = fileUrl;
        image.originalName = originalName;
        image.sortOrder = sortOrder;
        image.isActive = true;
        return image;
    }

}

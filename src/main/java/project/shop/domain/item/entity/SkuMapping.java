package project.shop.domain.item.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "TB_SKU_MAPPING")
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SkuMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sku_mapping_id")
    private Long skuMappingId;

    @Column(name = "item_option_id")
    private Long itemOptionId;

    @Column(name = "option_value_id")
    private Long optionValueId;
}

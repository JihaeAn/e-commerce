package project.shop.item.presentation.user.v1.response;

import project.shop.item.domain.entity.Item;
import project.shop.item.domain.entity.ItemOptionValue;
import project.shop.item.domain.entity.ItemSalePolicy;

import java.util.List;

public record ItemDetailResponse(
        Long itemId,
        String itemName,
        String categoryName,
        String description,
        Integer price,
        Integer salePrice,
        Integer discountRate,
        List<ItemImageResponse> imageUrls,
        List<ItemOptionGroupResponse> optionGroups
) {

    public static ItemDetailResponse from(Item item, String categoryName) {
        List<ItemImageResponse> imageUrls = item.getImages().stream()
                .filter(image -> Boolean.TRUE.equals(image.getIsActive()))
                .map(image -> new ItemImageResponse(
                        image.getFileUrl(),
                        image.getImageType().toString(),
                        image.getSortOrder()
                ))
                .toList();

        List<ItemOptionGroupResponse> optionGroups = item.getOptionGroups().stream()
                .map(group -> new ItemOptionGroupResponse(
                        group.getOptionGroupId(),
                        group.getGroupName(),
                        group.getValues().stream()
                                .map(ItemOptionValue::getValueName)
                                .toList()
                ))
                .toList();

        ItemSalePolicy policy = item.getSalePolicies().stream()
                .filter(ItemSalePolicy::getIsActive)
                .findFirst()
                .orElse(null);


        return new ItemDetailResponse(
                item.getItemId(),
                item.getItemName(),
                categoryName,
                item.getDescription(),
                item.getPrice(),
                policy.getSalePrice(),
                policy.getSalePercent(),
                imageUrls,
                optionGroups
        );
    }
}
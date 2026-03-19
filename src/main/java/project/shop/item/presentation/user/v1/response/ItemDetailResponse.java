package project.shop.item.presentation.user.v1.response;

import project.shop.item.domain.entity.Item;

import java.util.List;

public record ItemDetailResponse(
        Long itemId,
        String itemName,
        String categoryName,
        String description,
        Integer price,
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
                .map(g -> new ItemOptionGroupResponse(
                        g.getOptionGroupId(),
                        g.getGroupName(),
                        g.getValues().stream()
                                .map(v -> v.getValueName())
                                .toList()
                ))
                .toList();

        return new ItemDetailResponse(
                item.getItemId(),
                item.getItemName(),
                categoryName,
                item.getDescription(),
                item.getPrice(),
                imageUrls,
                optionGroups
        );
    }
}
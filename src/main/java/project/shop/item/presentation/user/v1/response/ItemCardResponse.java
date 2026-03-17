package project.shop.item.presentation.user.v1.response;

import project.shop.item.domain.entity.Item;

public record ItemCardResponse(
        Long itemId,
        String itemName,
        String categoryName,
        Integer price,
        String imageUrl
) {
    public static ItemCardResponse from(Item item, String categoryName) {
        String imageUrl = item.getImages().stream()
                .filter(img -> Boolean.TRUE.equals(img.getIsActive()))
                .min((a, b) -> Integer.compare(a.getSortOrder(), b.getSortOrder()))
                .map(img -> img.getFileUrl())
                .orElse(null);

        return new ItemCardResponse(
                item.getItemId(),
                item.getItemName(),
                categoryName,
                item.getPrice(),
                imageUrl
        );
    }
}
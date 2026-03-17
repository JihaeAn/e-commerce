package project.shop.item.presentation.user.v1.response;

import project.shop.item.domain.entity.Item;

import java.util.List;

public record ItemDetailResponse(
        Long itemId,
        String itemName,
        String categoryName,
        String description,
        Integer price,
        String imageUrl,
        List<OptionGroupDto> optionGroups
) {
    public record OptionGroupDto(
            Long optionGroupId,
            String groupName,
            List<String> optionValues
    ) {}

    public static ItemDetailResponse from(Item item, String categoryName) {
        String imageUrl = item.getImages().stream()
                .filter(img -> Boolean.TRUE.equals(img.getIsActive()))
                .min((a, b) -> Integer.compare(a.getSortOrder(), b.getSortOrder()))
                .map(img -> img.getFileUrl())
                .orElse(null);

        List<OptionGroupDto> optionGroups = item.getOptionGroups().stream()
                .map(g -> new OptionGroupDto(
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
                imageUrl,
                optionGroups
        );
    }
}
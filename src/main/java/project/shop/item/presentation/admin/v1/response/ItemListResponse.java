package project.shop.item.presentation.admin.v1.response;

import project.shop.item.domain.entity.Item;
import project.shop.item.domain.enums.Status;

import java.util.List;

public record ItemListResponse(
        Long itemId,
        String itemName,
        String categoryName,
        Integer price,
        Status status,
        List<String> optionGroupNames
) {
    public static ItemListResponse from(Item item, String categoryName) {
        List<String> groupNames = item.getOptionGroups().stream()
                .map(g -> g.getGroupName())
                .toList();
        return new ItemListResponse(
                item.getItemId(),
                item.getItemName(),
                categoryName,
                item.getPrice(),
                item.getStatus(),
                groupNames
        );
    }
}
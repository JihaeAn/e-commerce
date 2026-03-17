package project.shop.item.domain.command;

import project.shop.item.domain.enums.Status;


public record CreateItemCommand(
        // item
        int categoryId,
        String itemName,
        String description,
        Integer price,
        Status status
) {
}

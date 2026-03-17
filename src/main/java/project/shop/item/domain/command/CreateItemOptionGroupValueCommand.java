package project.shop.item.domain.command;

public record CreateItemOptionGroupValueCommand(
        String valueName,
        Integer additionalPrice,
        int sortOrder
) {
}

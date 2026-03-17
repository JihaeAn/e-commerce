package project.shop.item.presentation.admin.v1.request;

public record SaveItemOptionValue(
        String valueName,
        Integer additionalPrice,
        int sortOrder
) {
}

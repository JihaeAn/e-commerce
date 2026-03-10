package project.shop.domain.item.controller.admin.v1.request;

public record SaveItemOptionValue(
        String valueName,
        Integer additionalPrice,
        int sortOrder
) {
}

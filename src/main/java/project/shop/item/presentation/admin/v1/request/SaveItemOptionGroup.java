package project.shop.item.presentation.admin.v1.request;

import java.util.List;

public record SaveItemOptionGroup(
        String groupName,
        int sortOrder,

        // value 정보
        List<SaveItemOptionValue> values
) {
}

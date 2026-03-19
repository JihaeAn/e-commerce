package project.shop.item.presentation.user.v1.response;

import java.util.List;

public record ItemOptionGroupResponse(
        Long optionGroupId,
        String groupName,
        List<String> optionValues
) {
}

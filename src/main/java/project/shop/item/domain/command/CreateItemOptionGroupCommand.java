package project.shop.item.domain.command;

import project.shop.item.presentation.admin.v1.request.SaveItemOptionValue;

import java.util.List;

public record CreateItemOptionGroupCommand(
        String groupName,
        int sortOrder,

        // value 정보
        List<CreateItemOptionGroupValueCommand> values
) {
}

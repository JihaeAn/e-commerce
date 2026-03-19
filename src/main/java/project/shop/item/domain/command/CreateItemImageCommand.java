package project.shop.item.domain.command;

import project.shop.item.domain.enums.ImageType;

public record CreateItemImageCommand(
        String fileUrl,
        String originalName,
        ImageType imageType,
        int sortOrder
) {
}
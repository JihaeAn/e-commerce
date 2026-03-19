package project.shop.item.presentation.admin.v1.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import project.shop.item.domain.enums.ImageType;

public record SaveItemImage(
        @NotBlank String fileUrl,
        @NotBlank String originalName,
        @NotNull ImageType imageType,
        int sortOrder
) {
}
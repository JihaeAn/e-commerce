package project.shop.item.presentation.admin.v1.request;

import jakarta.validation.constraints.NotBlank;

public record PresignedUrlRequest(
        @NotBlank String fileName,
        @NotBlank String contentType
) {
}

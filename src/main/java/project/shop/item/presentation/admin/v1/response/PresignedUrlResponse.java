package project.shop.item.presentation.admin.v1.response;

public record PresignedUrlResponse(
        String uploadUrl,
        String fileUrl
) {
}
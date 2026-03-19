package project.shop.item.presentation.user.v1.response;

public record ItemImageResponse(
        String fileUrl,
        String imageType,
        int sortOrder
) {
}

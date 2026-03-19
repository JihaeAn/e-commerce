package project.shop.item.presentation.admin.v1;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.shop.global.s3.S3Service;
import project.shop.item.presentation.admin.v1.request.PresignedUrlRequest;
import project.shop.item.presentation.admin.v1.response.PresignedUrlResponse;

@RestController("AdminItemImageController")
@RequestMapping("/admin/v1/images")
@RequiredArgsConstructor
public class ItemImageController {

    private final S3Service s3Service;

    /**
     * Presigned URL 발급
     * 프론트에서 이 URL로 이미지를 S3에 직접 PUT 업로드
     */
    @PostMapping("/presigned-url")
    public PresignedUrlResponse getPresignedUrl(@RequestBody @Valid PresignedUrlRequest request) {
        S3Service.PresignedUrlResult result = s3Service.generatePresignedUrl(
                request.fileName(), request.contentType());
        return new PresignedUrlResponse(result.uploadUrl(), result.fileUrl());
    }
}
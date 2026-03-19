package project.shop.global.s3;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.time.Duration;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final S3Presigner s3Presigner;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.s3.region}")
    private String region;

    @Value("${cloud.aws.s3.presigned-url-expiration}")
    private int expirationSeconds;

    /**
     * Presigned URL 발급
     * - uploadUrl: 프론트가 이미지를 PUT으로 직접 올릴 S3 URL
     * - fileUrl: 업로드 완료 후 DB에 저장할 실제 접근 URL
     */
    public PresignedUrlResult generatePresignedUrl(String fileName, String contentType) {
        String key = "items/" + UUID.randomUUID() + "/" + fileName;

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucket)
                .key(key)
                .contentType(contentType)
                .build();

        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofSeconds(expirationSeconds))
                .putObjectRequest(putObjectRequest)
                .build();

        PresignedPutObjectRequest presigned = s3Presigner.presignPutObject(presignRequest);

        String fileUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucket, region, key);

        return new PresignedUrlResult(presigned.url().toString(), fileUrl);
    }

    public record PresignedUrlResult(String uploadUrl, String fileUrl) {}
}
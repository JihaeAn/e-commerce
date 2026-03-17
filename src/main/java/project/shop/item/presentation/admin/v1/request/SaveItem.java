package project.shop.item.presentation.admin.v1.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import project.shop.item.domain.enums.PolicyType;
import project.shop.item.domain.enums.Status;

import java.time.LocalDateTime;
import java.util.List;

public record SaveItem(
        // item
        int categoryId,
        @NotBlank(message = "상품 이름은 2글자 이상이어야 해요")
        String itemName,
        String description,
        @NotNull(message = "상품의 가격을 입력해주세요")
        @Min(0)
        Integer price,
        @NotNull(message = "판매 준비 상태를 선택해주세요")
        Status status,

        // policy
        @NotNull(message = "판매 정책 상태를 선택해주세요")
        PolicyType policyType,
        @NotNull(message = "판매 가격을 입력해주세요")
        @Min(0)
        Integer salePrice,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        @NotNull
        LocalDateTime saleStartAt,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        @NotNull
        LocalDateTime saleEndAt,

        // group & value
        List<SaveItemOptionGroup> groups
) {
}

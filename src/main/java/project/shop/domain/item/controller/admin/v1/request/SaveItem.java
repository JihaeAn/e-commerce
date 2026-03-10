package project.shop.domain.item.controller.admin.v1.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import project.shop.domain.item.enums.PolicyType;
import project.shop.domain.item.enums.Status;

import java.time.LocalDateTime;
import java.util.List;

public record SaveItem(
        // item
        int CategoryId,
        @NotBlank(message = "상품 이름은 2글자 이상이어야 해요.")
        String itemName,
        String description,
        @NotNull(message = "상품의 가격은 필수 입력사항이에요.")
        Integer price,
        @NotBlank(message = "판매 준비 상태를 선택해주세요.")
        Status status,

        // policy
        @NotBlank(message = "판매 정책 상태를 선택해주세요.")
        PolicyType policyType,
        @NotNull(message = "판매 가격을 입력")
        Integer salePrice,
        LocalDateTime saleStartAt,
        LocalDateTime saleEndAt,

        // group & value
        List<SaveItemOptionGroup> groups
) {
}

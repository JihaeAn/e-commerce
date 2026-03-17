package project.shop.item.domain.command;

import project.shop.item.domain.enums.PolicyType;

import java.time.LocalDateTime;

public record CreateItemSalePolicyCommand(
        PolicyType policyType,
        Integer originPrice,
        Integer salePrice,
        LocalDateTime saleStartAt,
        LocalDateTime saleEndAt
) {
}

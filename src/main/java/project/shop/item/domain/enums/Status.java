package project.shop.item.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 활성화는 판매 준비가 완료되었다는 거다.
 * 실제로 팔 수 있는지는
 * ItemSalePolicy의 sale_start_at와
 * ItemSku의 stock_quantity로 구분한다.
 */
@Getter
@AllArgsConstructor
public enum Status {
    ACTIVE("활성"),
    INACTIVE("비활성"),
    DELETED("삭제"),
    SOLD_OUT("품절");

    private final String description;

}

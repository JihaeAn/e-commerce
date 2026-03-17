package project.shop.item.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PolicyType {
    NORMAL("일반 판매"),
    EVENT("이벤트 판매"),
    TIME_SALE("타임 세일 판매"),
    PRE_ORDER("예약 판매");

    private final String description;

}

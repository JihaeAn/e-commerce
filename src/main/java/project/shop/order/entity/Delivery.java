package project.shop.order.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.shop.global.entity.BaseEntity;

import java.time.LocalDateTime;

@Entity
@Table(name = "TB_DELIVERY")
@Getter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Delivery extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "delivery_id")
    private Long deliveryId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, unique = true)  // unique = 1:1 보장
    private Order order;

    @Column(name = "courier_company")
    private String courierCompany;

    @Column(name = "tracking_number")
    private String trackingNumber;

    @Column(name = "delivery_status")
    private String deliveryStatus; // todo: enum으로 변경

    @Column(name = "delivery_start_at")
    private LocalDateTime deliveryStartAt;

    @Column(name = "delivery_end_at")
    private LocalDateTime deliveryEndAt;
}

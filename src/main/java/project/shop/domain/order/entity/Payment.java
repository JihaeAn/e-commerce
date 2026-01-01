package project.shop.domain.order.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.shop.global.entity.BaseEntity;

import java.math.BigDecimal;

@Entity
@Table(name = "TB_PAYMENT")
@Getter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Payment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long paymentId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, unique = true)  // unique = 1:1 보장
    private Order order;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "pay_method")
    private String payMethod; // todo: enum으로 변경

    @Column(name = "pay_amount")
    private Integer payAmount;

    @Column(name = "pay_status")
    private String payStatus; // todo: enum으로 변경

    @Column(name = "pay_provider")
    private String payProvider;

    @Column(name = "pg_tx_id")
    private String pgTxId;

    @Column(name = "fail_reason")
    private String failReason;
}

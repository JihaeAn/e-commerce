package project.shop.domain.user.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.shop.global.entity.BaseEntity;

@Entity
@Table(name = "TB_ADDRESS")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Address extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "recipient_name", length = 50)
    private String recipientName;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Column(name = "zip_code", length = 10)
    private String zipCode;

    @Column(name = "address", length = 100)
    private String address;

    @Column(name = "address_detail", length = 100)
    private String addressDetail;

    @Column(name = "address_memo", length = 50)
    private String addressMemo;

    @Column(name = "address_type", length = 20)
    private String addressType; // todo: Enum으로 관리

    @Column(name = "address_type_name", length = 30)
    private String addressTypeName;

    @Column(name = "is_default", length = 1)
    private String isDefault;
}

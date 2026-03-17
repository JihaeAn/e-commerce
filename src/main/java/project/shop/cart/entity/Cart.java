package project.shop.cart.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.shop.item.domain.entity.ItemSku;
import project.shop.user.entity.User;
import project.shop.global.entity.BaseEntity;

@Entity
@Table(name = "TB_CART")
@Getter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Cart extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long cartId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_option_id", nullable = false)
    private ItemSku itemSkus;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "is_checked")
    private String isChecked;
}

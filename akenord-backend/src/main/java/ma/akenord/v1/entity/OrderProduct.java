package ma.akenord.v1.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "order_products")
public class OrderProduct {

    @EmbeddedId
    private OrderProductId id;

    @MapsId("orderId")
    @ManyToOne(fetch = FetchType.EAGER,cascade = {CascadeType.DETACH,CascadeType.MERGE
            ,CascadeType.PERSIST
            ,CascadeType.REFRESH})
@JoinColumn(name = "order_id")
private Order order;

    @MapsId("productId")
    @ManyToOne(fetch = FetchType.EAGER,cascade = {CascadeType.DETACH,CascadeType.MERGE
            ,CascadeType.PERSIST
            ,CascadeType.REFRESH})
    @JoinColumn(name = "product_id")
    private Product product;

    @NotNull
    @Column(name = "price")
    private float price;

    @NotNull
    @Column(name = "quantity")
    private int quantity;

    @Column(name = "color")
    private String color;

    @Column(name = "size")
    private String size;


    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderProductId implements Serializable {
        private Long orderId;
        private Long productId;

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            OrderProductId that = (OrderProductId) o;
            return orderId.equals(that.orderId) && productId.equals(that.productId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(orderId, productId);
        }
    }

}

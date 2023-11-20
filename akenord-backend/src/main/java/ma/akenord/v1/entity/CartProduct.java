package ma.akenord.v1.entity;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cart_products")
public class CartProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER,cascade = {CascadeType.DETACH,CascadeType.MERGE
            ,CascadeType.PERSIST
            ,CascadeType.REFRESH})
    @JoinColumn(name = "cart_username")
    private Cart cart;

    @ManyToOne(fetch = FetchType.EAGER,cascade = {CascadeType.DETACH,CascadeType.MERGE
            ,CascadeType.PERSIST
            ,CascadeType.REFRESH})
    @JoinColumn(name = "product_id")
    private Product product;

    @NotNull
    @Column(name = "quantity")
    private int quantity;

    @Column(name = "color")
    private String color;

    @Column(name = "size")
    private String size;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String getCUsername() {
        return cart != null ? cart.getUsername_user() : null;
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String getPName() {
        return product != null ? product.getName() : null;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", cart=" + cart.getUsername_user() +
                ", product=" + product.getName() +
                ", quantity=" + quantity +
                '}';
    }
}

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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER,cascade = {CascadeType.DETACH,CascadeType.MERGE
            ,CascadeType.PERSIST
            ,CascadeType.REFRESH})
@JoinColumn(name = "order_id")
private Order order;

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




}

package ma.akenord.v1.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    @NotNull(message = "First Name is required")
    @Size(min = 1, message = "First Name is required")
    @Column(name = "first_name")
    private String first_name;

    @NotNull(message = "Last Name is required")
    @Size(min = 1, message = "Last Name is required")
    @Column(name = "last_name")
    private String last_name;

    @NotNull(message = "Address is required")
    @Size(min = 1, message = "Address is required")
    @Column(name = "address")
    private String address;

    @NotNull(message = "Region is required")
    @Size(min = 1, message = "Region is required")
    @Column(name = "region")
    private String region;

    @NotNull(message = "City is required")
    @Size(min = 1, message = "City is required")
    @Column(name = "city")
    private String city;

    @Column(name = "phone_number")
    @Pattern(regexp = "\\d{10}", message = "Phone number must be exactly 10 digits")
    private String phone_number;

    @NotNull(message = "Email is required")
    @Size(min = 1, message = "Email is required")
    @Column(name = "email")
    private String email;

    @NotNull(message = "Postal Code is required")
    @Size(min = 1, message = "Postal Code is required")
    @Column(name = "postal_code")
    private String postalCode;

    @NotNull(message = "Order Total is required")
    @Column(name = "order_total")
    private float orderTotal;

    @Column(name = "shipping_price")
    private float shippingPrice;


    @Column(name = "order_note")
    private String orderNote;

    @NotNull(message = "Payment Method is required")
    @Size(min = 1, message = "Payment Method is required")
    @Column(name = "payment_method")
    private String paymentMethod;

    @NotNull
    @Column(name = "order_date")
    private LocalDateTime order_date;

    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(name = "status")
    private OrderStatus status;

    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.MERGE
            ,CascadeType.PERSIST
            ,CascadeType.REFRESH})
    @JoinColumn(name = "username_user")
    @JsonIgnore
    private User user;


    @ManyToOne(fetch = FetchType.EAGER,cascade = {CascadeType.DETACH,CascadeType.MERGE
            ,CascadeType.PERSIST
            ,CascadeType.REFRESH})
    @JoinColumn(name = "coupon_id")
    private Coupon coupon;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = {CascadeType.DETACH,CascadeType.MERGE
            ,CascadeType.PERSIST
            ,CascadeType.REFRESH})
    @JsonIgnore
    private List<OrderProduct> orderProducts;

    @JsonInclude
    public List<List<String>> getProductInfoList() {
        List<List<String>> productInfoList = new ArrayList<>();
        if (orderProducts != null) {
            for (OrderProduct orderProduct : orderProducts) {
                if (orderProduct.getProduct() != null) {
                    List<String> productInfo = new ArrayList<>();
                    productInfo.add(orderProduct.getProduct().getImages());
                    productInfo.add(orderProduct.getProduct().getName());
                    productInfo.add(Integer.toString(orderProduct.getQuantity()));
                    productInfo.add(Float.toString(orderProduct.getPrice()));
                    productInfo.add(orderProduct.getSize());
                    productInfo.add(orderProduct.getColor());
                    productInfoList.add(productInfo);
                }
            }
        }
        return productInfoList;
    }


    public enum OrderStatus {
        processing,
        completed,
        canceled
    }


}

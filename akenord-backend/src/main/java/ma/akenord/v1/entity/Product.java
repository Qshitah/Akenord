package ma.akenord.v1.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.data.rest.core.annotation.RestResource;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id") // Include id in JSON response
    private Long id;


    @NotNull(message = "Name Product is empty")
    @NotEmpty(message = "Name Product is empty")
    @Column(name = "name")
    private String name;

    @NotNull(message = "SKU is Empty")
    @Column(name = "sku")
    private String sku;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "price")
    private float price;

    @NotNull
    @Column(name = "discount_price")
    private float discountPrice;

    @NotNull
    @Column(name = "cost")
    @JsonIgnore
    private float cost;


    @Column(columnDefinition = "json")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String images;

    @NotNull
    @Column(name = "stars")
    private int stars;

    @NotNull
    @Column(name = "stock")
    private Long stock;

    @Column(name = "featured")
    private boolean featured;

    @Column(name = "popular")
    private boolean popular;

    @Column(name = "hot")
    private boolean hot;

    @Column(name = "arrivals")
    private boolean arrivals;

    @Column(name = "top")
    private boolean top;

    @Column(name = "trendy")
    private boolean trendy;

    @Column(name = "deals")
    private boolean deals;

    @RestResource(exported = true)
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.EAGER,cascade = {CascadeType.DETACH,CascadeType.MERGE
            ,CascadeType.PERSIST
            ,CascadeType.REFRESH})
    @JoinColumn(name = "username_user")
    private User user;

    @ManyToMany(fetch = FetchType.EAGER,cascade = {CascadeType.DETACH,
            CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinTable(
            name = "product_sizes",
            joinColumns = @JoinColumn(name = "product_id" ),
            inverseJoinColumns = @JoinColumn(name = "size_id")
    )
    private List<Size> sizes;

    @OneToMany(mappedBy = "product",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private List<Color> colors;



    @ManyToMany(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,
            CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinTable(
            name = "wishlist_products",
            joinColumns = @JoinColumn(name = "product_id" ),
            inverseJoinColumns = @JoinColumn(name = "wishlist_username")
    )
    @JsonIgnore
    private List<Wishlist> wishlists;

    @OneToMany(mappedBy = "product",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private List<Review> reviews;

    @OneToMany(mappedBy = "product",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JsonIgnore
    private List<CartProduct> cartProducts;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public ArrayList<Review> getReviews() {
        return reviews != null ? new ArrayList<Review>(reviews) : new ArrayList<>();
    }


    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String getUsername() {
        return user != null ? user.getUsername() : null;
    }



    @JsonInclude(JsonInclude.Include.NON_NULL)
    public List<Color> getColors() {
        return colors;
    }

    @ManyToOne(fetch = FetchType.EAGER,cascade = {CascadeType.DETACH,CascadeType.MERGE
            ,CascadeType.PERSIST
            ,CascadeType.REFRESH})
    @JoinColumn(name = "subcategory_id")
    private SubCategory subCategory;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = {CascadeType.DETACH,CascadeType.MERGE
            ,CascadeType.PERSIST
            ,CascadeType.REFRESH})
    @JsonIgnore
    private List<OrderProduct> orderProducts;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String getSubcategory() {
        return subCategory != null ? subCategory.getName().toLowerCase() : null;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", sku='" + sku + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", discountPrice=" + discountPrice +
                ", cost=" + cost +
                ", stock=" + stock +
                ", images='" + images + '\'' +
                ", stars=" + stars +
                ", featured=" + featured +
                ", popular=" + popular +
                ", hot=" + hot +
                ", arrivals=" + arrivals +
                ", top=" + top +
                ", trendy=" + trendy +
                ", deals=" + deals +
                ", createdAt=" + createdAt +
                ", user=" + user.getUsername() +
                ", subCategory=" + subCategory.getName() +
                ", reviews=" + reviews +
                '}';
    }
}

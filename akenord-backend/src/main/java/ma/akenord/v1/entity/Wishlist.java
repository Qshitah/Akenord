package ma.akenord.v1.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "wishlist")
public class Wishlist {
    @Id
    private String username_user;

    @OneToOne(fetch = FetchType.EAGER,cascade = {CascadeType.DETACH,CascadeType.MERGE
            ,CascadeType.PERSIST
            ,CascadeType.REFRESH})
    @MapsId
    @JoinColumn(name = "username_user")
    @JsonIgnore
    private User user;

    @Column(name = "created_at")
    private LocalDateTime created_at;


    @ManyToMany(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,
            CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinTable(
            name = "wishlist_products",
            joinColumns = @JoinColumn(name = "wishlist_username" ),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    @JsonIgnore
    private List<Product> products ;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String getUsername() {
        return user != null ? user.getUsername() : null;
    }


    @JsonInclude(JsonInclude.Include.NON_NULL)
    public List<Product> getProducts() {
        return products != null ? products : null;
    }

    @Override
    public String toString() {
        return "{" +
                "username_user='" + username_user + '\'' +
                ", created_at=" + created_at +
                '}';
    }
}

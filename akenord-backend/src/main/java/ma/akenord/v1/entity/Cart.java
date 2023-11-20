package ma.akenord.v1.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "carts")
public class Cart {

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
    @JsonIgnore
    private LocalDateTime created_at;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    private List<CartProduct> cartProducts;


}

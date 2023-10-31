package ma.akenord.v1.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "sizes")
public class Size {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Name Size is empty")
    @NotEmpty(message = "Name Size is empty")
    @Column(name = "name")
    private String name;

    @ManyToMany(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,
            CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinTable(
            name = "product_sizes",
            joinColumns = @JoinColumn(name = "size_id" ),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products ;

    public Size(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}

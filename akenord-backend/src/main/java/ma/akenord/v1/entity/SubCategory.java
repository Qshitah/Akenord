package ma.akenord.v1.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
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
@Table(name = "subcategories")
public class SubCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name")
    private String name;

    @Column(name = "image")
    private String image;

    @ManyToOne(fetch = FetchType.EAGER,cascade = {CascadeType.DETACH,
            CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;


    @OneToMany(mappedBy = "subCategory",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Product> products;


    @JsonInclude(JsonInclude.Include.NON_NULL)
    public Long getCategory() {
        return category.getId() ;
    }

    @Override
    public String toString() {
        return "{" +
                "name='" + name + '\'' +
                ", image='" + image + '\'' +
                '}';
    }
}

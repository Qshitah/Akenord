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
@Table(name = "colors")
public class Color {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Name Color is empty")
    @NotEmpty(message = "Name Color is empty")
    @Column(name = "name")
    private String name;

    @NotNull(message = "Value Color is empty")
    @NotEmpty(message = "Value Color is empty")
    @Column(name = "value")
    private String value;


    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(name = "type")
    private ColorType type;

    @ManyToOne(fetch = FetchType.EAGER,cascade = {CascadeType.DETACH,
            CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "product_id")
    private Product product ;

    public Color(String name, String value, ColorType type, Product product) {
        this.name = name;
        this.value = value;
        this.type = type;
        this.product = product;
    }

    @Override
    public String toString() {
        return "Color{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type=" + type +
                '}';
    }

    public enum ColorType {
        image,
        color
    }
}

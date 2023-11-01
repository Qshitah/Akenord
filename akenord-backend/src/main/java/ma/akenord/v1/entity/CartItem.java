package ma.akenord.v1.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartItem {
    private String name;
    private int quantity;
    private String size;
    private String color;

    // Constructors, getters, and setters
}

package ma.akenord.v1.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {

    private String username;

    private String password;

    private String images;

    private String name;

    private String sku;

    private Long stock;

    private List<String> sizes;

    private List<List<String>> colors;

    private List<List<String>> imageColors;

    private String description;

    private float price;

    private float discountPrice;

    private float cost;

    private String subcategory;
}

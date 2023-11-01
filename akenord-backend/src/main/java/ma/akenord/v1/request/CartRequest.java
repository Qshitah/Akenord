package ma.akenord.v1.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartRequest {

    private String username;

    private String product_name;

    private String color;

    private String size;

    public int quantity;

    private LocalDateTime created_at;

}

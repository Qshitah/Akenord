package ma.akenord.v1.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.akenord.v1.entity.Wishlist;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CollectionWishlistResponse {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Wishlist wishlists;

    private String errorMessage;


}

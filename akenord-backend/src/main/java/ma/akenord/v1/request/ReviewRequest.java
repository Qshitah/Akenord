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
public class ReviewRequest {

    private int rating;

    private String product_name;

    private String username;

    private String comment;

    private LocalDateTime created_date;

}

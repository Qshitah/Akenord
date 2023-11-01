package ma.akenord.v1.request;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.akenord.v1.entity.Coupon;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {

    private String username;
    private String firstName;
    private String lastName;
    private String address;
    private String region;
    private String city;
    private String email;
    private String phoneNumber;
    private String postalCode;
    private String orderNote;
    private String paiment;
    private JsonNode coupon;
    private float orderTotal;
    private float total;
    private float shippingPrice;
    private Date currentDate;

    private List<List<Object>> products;



}

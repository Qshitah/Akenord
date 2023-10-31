package ma.akenord.v1.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import ma.akenord.v1.entity.*;
import ma.akenord.v1.repository.*;
import ma.akenord.v1.request.CartRequest;
import ma.akenord.v1.request.CartResponse;
import ma.akenord.v1.request.OrderRequest;
import ma.akenord.v1.request.OrderResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {


    @Autowired
    private final OrderRepository orderRepository;

    @Autowired
    private final OrderProductRepository orderProductRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final ProductRepository productRepository;

    @Autowired
    private final CouponRepository couponRepository;

    @Autowired
    private final CartProductRepository cartProductRepository;

    public OrderResponse saveOrder(OrderRequest request) throws JsonProcessingException {
        Order order = new Order();
        Optional<User> user = userRepository.findById(request.getUsername());
        if(user.isPresent()){
            order.setUser(user.get());
            order.setFirst_name(request.getFirstName());
            order.setLast_name(request.getLastName());
            order.setAddress(request.getAddress());
            order.setOrderNote(request.getOrderNote());
            order.setRegion(request.getRegion());
            order.setCity(request.getCity());
            order.setOrderTotal(request.getTotal());
            order.setShippingPrice(request.getShippingPrice());
            order.setPhone_number(request.getPhoneNumber());
            order.setPostalCode(request.getPostalCode());
            order.setPaymentMethod(request.getPaiment());
            order.setEmail(request.getEmail());
            order.setOrder_date(LocalDateTime.now());
            order.setStatus(Order.OrderStatus.processing);

            if (request.getCoupon() != null) {
                String couponJson = request.getCoupon().asText(); // Convert the JSON node to a string
                if (!couponJson.isEmpty()) {
                    ObjectMapper objectMapper = new ObjectMapper();
                    try {
                        Coupon couponFromJson = objectMapper.readValue(couponJson, Coupon.class);
                        Coupon coupon = couponRepository.findByCode(couponFromJson.getCode());
                        if (coupon == null) {
                            return OrderResponse.builder()
                                    .errorMessage("Order has been Failed, Try again")
                                    .build();
                        }
                        order.setCoupon(coupon);
                    } catch (JsonProcessingException e) {
                        // Handle JSON deserialization exception, e.g., log the error
                        return OrderResponse.builder()
                                .errorMessage("Failed to parse coupon JSON")
                                .build();
                    }
                }
            }

            List<OrderProduct> orderProducts = new ArrayList<>();
            Order savedOrder = orderRepository.save(order);

            for (List<Object> item : request.getProducts()) {
                Product product = productRepository.findByName((String) item.get(1));
                if (product == null) {
                    return OrderResponse.builder()
                            .errorMessage("Order has been Failed, Try again")
                            .build();
                }

                Number price = (Number) item.get(3);
                Double priceD = 0.0;
                if (price instanceof Double) {
                    priceD = (Double) price;
                } else if (price instanceof Integer) {
                    priceD = ((Integer) price).doubleValue();
                }
                int quantity = (int) item.get(2);


                OrderProduct orderProduct = new OrderProduct();
                OrderProduct.OrderProductId orderProductId = new OrderProduct.OrderProductId();
                orderProductId.setOrderId(savedOrder.getId()); // Set the order ID
                orderProductId.setProductId(product.getId());
                orderProduct.setPrice(priceD.floatValue());
                orderProduct.setId(orderProductId);
                orderProduct.setOrder(savedOrder);
                orderProduct.setProduct(product);
                orderProduct.setQuantity(quantity);
                orderProduct.setSize((String) item.get(4));
                orderProduct.setColor((String) item.get(5));

                // Add the OrderProduct to the list
                orderProducts.add(orderProduct);
            }

            // Save the OrderProduct and do any additional logic
            orderProductRepository.saveAll(orderProducts);

            cartProductRepository.deleteCartProductsByUsername(request.getUsername());

            return OrderResponse.builder()
                    .message("Order has been successfully saved")
                    .build();

        }
        return OrderResponse.builder()
                .errorMessage ("Order has been Failed,Try again")
                .build();

    }


}

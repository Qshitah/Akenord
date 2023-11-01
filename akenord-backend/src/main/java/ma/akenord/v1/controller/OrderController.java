package ma.akenord.v1.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.akenord.v1.authentification.AuthenticationRequest;
import ma.akenord.v1.authentification.AuthenticationService;
import ma.akenord.v1.authentification.ErrorResponse;
import ma.akenord.v1.authentification.RegisterResponse;
import ma.akenord.v1.entity.Cart;
import ma.akenord.v1.entity.CartProduct;
import ma.akenord.v1.entity.Order;
import ma.akenord.v1.entity.OrderProduct;
import ma.akenord.v1.repository.OrderProductRepository;
import ma.akenord.v1.repository.OrderRepository;
import ma.akenord.v1.request.OrderRequest;
import ma.akenord.v1.request.OrderResponse;
import ma.akenord.v1.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class OrderController {

    @Autowired
    private final OrderService service;

    @Autowired
    private final AuthenticationService authenticationService;

    @Autowired
    private final OrderRepository orderRepository;

    @Autowired
    private final OrderProductRepository orderProductRepository;

    @PostMapping("/orders")
    public ResponseEntity<?> saveOrder(
            @RequestBody @Valid OrderRequest request
    ) {
        try {

            OrderResponse response = service.saveOrder(request);

            if (response != null && response.getErrorMessage() != null) {
                // Return a BAD_REQUEST (400) response with the error message
                return ResponseEntity.badRequest().body(new ErrorResponse("Authentication failed", response.getErrorMessage(),400));
            }

            // Authentication succeeded
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            // Authentication failed (incorrect password)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed", "Incorrect username or password",401));
        } catch (AuthenticationException e) {
            // Handle other authentication exception (e.g., locked account, disabled account)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed","Incorrect username or password",401));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/orders/{username}")
    public ResponseEntity<?> getOrders(
            @RequestBody @Valid AuthenticationRequest request, @PathVariable String username
    ) {

        try {

            if (!Objects.equals(username, request.getUsername())){
                return ResponseEntity.badRequest().body(new ErrorResponse("Getting order failed","Erreur",400));
            }

            RegisterResponse response = authenticationService.permissionAuthenticate(request);

            if(response != null){
                if (response.getErrorMessage() != null) {
                    // Return a BAD_REQUEST (400) response with the error message
                    return ResponseEntity.badRequest().body(new ErrorResponse("Authentication failed", response.getErrorMessage(),400));
                }

            }

            List<Order> order = orderRepository.findByUserUsername(username);


            return ResponseEntity.ok(order);


        }catch (BadCredentialsException e) {
            // Authentication failed (incorrect password)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed", "Incorrect username or password",401));
        } catch (AuthenticationException e) {
            // Handle other authentication exception (e.g., locked account, disabled account)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed","Incorrect username or password",401));
        }
    }

    @PostMapping("/productsOrders")
    public ResponseEntity<?> getAllProductsOrder(
            @RequestBody @Valid AuthenticationRequest request
    ) {
        try {


            RegisterResponse response = authenticationService.permissionAuthenticateAdmin(request);

            if(response != null){
                if (response.getErrorMessage() != null) {
                    // Return a BAD_REQUEST (400) response with the error message
                    return ResponseEntity.badRequest().body(new ErrorResponse("Authentication failed", response.getErrorMessage(),400));
                }

            }

            List<String> productNames = new ArrayList<>();

            for (OrderProduct orderProduct : orderProductRepository.findAll()) {
                productNames.add(orderProduct.getProduct().getName());
            }

            return ResponseEntity.ok(productNames);


        }catch (BadCredentialsException e) {
            // Authentication failed (incorrect password)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed", "Incorrect username or password",401));
        } catch (AuthenticationException e) {
            // Handle other authentication exception (e.g., locked account, disabled account)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed","Incorrect username or password",401));
        }
    }

}

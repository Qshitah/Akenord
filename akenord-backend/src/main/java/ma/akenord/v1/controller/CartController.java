package ma.akenord.v1.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.akenord.v1.authentification.AuthenticationRequest;
import ma.akenord.v1.authentification.AuthenticationService;
import ma.akenord.v1.authentification.ErrorResponse;
import ma.akenord.v1.authentification.RegisterResponse;
import ma.akenord.v1.entity.Cart;
import ma.akenord.v1.repository.CartRepository;
import ma.akenord.v1.request.CartRequest;
import ma.akenord.v1.request.CartResponse;
import ma.akenord.v1.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CartController {

    @Autowired
    private final CartService service;

    @Autowired
    private final AuthenticationService authenticationService;

    @Autowired
    private final CartRepository cartRepository;

    @DeleteMapping("/carts/{username}/{id}")
    public ResponseEntity<?> deleteWishlist(
            @PathVariable String username,@PathVariable String id
    ) {
        CartResponse response = service.removeProductFromCart(username,id);

        if (response != null && response.getErrorMessage() != null) {
            // Return a BAD_REQUEST (400) response with the error message
            return ResponseEntity.badRequest().body(new ErrorResponse("Cart failed", response.getErrorMessage(),400));
        }

        // Authentication succeeded
        return ResponseEntity.ok(response);
    }

    @PostMapping("/carts")
    public ResponseEntity<?> saveWishlist(
            @RequestBody @Valid CartRequest request
    ) {
        CartResponse response = service.saveCart(request);

        if (response != null && response.getErrorMessage() != null) {
            // Return a BAD_REQUEST (400) response with the error message
            return ResponseEntity.badRequest().body(new ErrorResponse("Cart failed", response.getErrorMessage(),400));
        }

        // Authentication succeeded
        return ResponseEntity.ok(response);
    }

    @PostMapping("/carts/{username}/products")
    public ResponseEntity<?> getWishlist(
            @RequestBody @Valid AuthenticationRequest request, @PathVariable String username
    ) {

        try {

            if (!Objects.equals(username, request.getUsername())){
                return ResponseEntity.badRequest().body(new ErrorResponse("Getting cart failed","Erreur",400));
            }

            RegisterResponse response = authenticationService.permissionAuthenticate(request);

            if(response != null){
                if (response.getErrorMessage() != null) {
                    // Return a BAD_REQUEST (400) response with the error message
                    return ResponseEntity.badRequest().body(new ErrorResponse("Authentication failed", response.getErrorMessage(),400));
                }

            }

            Optional<Cart> cart = cartRepository.findById(username);

            if(cart.isEmpty()){
                List<String> emptyList = Collections.emptyList();
                return ResponseEntity.ok(emptyList);
            }

            List<String> cartList = cart.get().getCartProducts().stream()
                    .map(cartProduct -> {
                        Long id = cartProduct.getId();
                        String name = cartProduct.getPName(); // Replace with the actual method to get the name
                        int quantity = cartProduct.getQuantity(); // Replace with the actual method to get the quantity
                        String size = cartProduct.getSize(); // Replace with the actual method to get the size
                        String color = cartProduct.getColor();// Replace with the actual method to get the color
                        // Create a string with all the details
                        return name + " - Quantity: " + quantity + " - Size: " + size + " - Color: " + color + " - id: " + id;
                    })
                    .toList();



            return ResponseEntity.ok(cartList);


        }catch (BadCredentialsException e) {
            // Authentication failed (incorrect password)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed", "Incorrect username or password",401));
        } catch (AuthenticationException e) {
            // Handle other authentication exception (e.g., locked account, disabled account)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed","Incorrect username or password",401));
        }
    }


}

package ma.akenord.v1.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.akenord.v1.authentification.*;
import ma.akenord.v1.entity.Product;
import ma.akenord.v1.entity.Wishlist;
import ma.akenord.v1.repository.WishlistRepository;
import ma.akenord.v1.request.*;
import ma.akenord.v1.service.ReviewService;
import ma.akenord.v1.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class WishlistController {

    @Autowired
    private final WishlistService service;

    @Autowired
    private final AuthenticationService authenticationService;

    @Autowired
    private final WishlistRepository wishlistRepository;

    @DeleteMapping("/wishlists/{username}/{productName}")
    public ResponseEntity<?> deleteWishlist(
            @PathVariable String username,@PathVariable String productName
    ) {
        String name = productName.replace('-',' ');

        WishlistResponse response = service.removeProductFromWishlist(username,name);

        if (response != null && response.getErrorMessage() != null) {
            // Return a BAD_REQUEST (400) response with the error message
            return ResponseEntity.badRequest().body(new ErrorResponse("Wishlist failed", response.getErrorMessage(),400));
        }

        // Authentication succeeded
        return ResponseEntity.ok(response);
    }


    @PostMapping("/wishlists")
    public ResponseEntity<?> saveWishlist(
            @RequestBody @Valid WishlistRequest request
    ) {
        WishlistResponse response = service.saveWishlist(request);

        if (response != null && response.getErrorMessage() != null) {
            // Return a BAD_REQUEST (400) response with the error message
            return ResponseEntity.badRequest().body(new ErrorResponse("Wishlist failed", response.getErrorMessage(),400));
        }

        // Authentication succeeded
        return ResponseEntity.ok(response);
    }

    @PostMapping("/wishlists/{username}/products")
    public ResponseEntity<?> getWishlist(
            @RequestBody @Valid AuthenticationRequest request,@PathVariable String username
    ) {

        try {

            if (!Objects.equals(username, request.getUsername())){
                return ResponseEntity.badRequest().body(new ErrorResponse("Getting wishlist failed","Erreur",400));
            }

            RegisterResponse response = authenticationService.permissionAuthenticate(request);

            if(response != null){
                if (response.getErrorMessage() != null) {
                    // Return a BAD_REQUEST (400) response with the error message
                    return ResponseEntity.badRequest().body(new ErrorResponse("Authentication failed", response.getErrorMessage(),400));
                }

            }

            Optional<Wishlist> wishlist = wishlistRepository.findById(username);

            if(wishlist.isEmpty()){
                List<String> emptyList = Collections.emptyList();
                return ResponseEntity.ok(emptyList);
            }

            List<String> productNameList = wishlist.get().getProducts().stream().map(Product::getName).toList();

            return ResponseEntity.ok(productNameList);


        }catch (BadCredentialsException e) {
            // Authentication failed (incorrect password)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed", "Incorrect username or password",401));
        } catch (AuthenticationException e) {
            // Handle other authentication exception (e.g., locked account, disabled account)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed","Incorrect username or password",401));
        }
    }



}

package ma.akenord.v1.service;

import lombok.RequiredArgsConstructor;
import ma.akenord.v1.entity.Product;
import ma.akenord.v1.entity.Review;
import ma.akenord.v1.entity.User;
import ma.akenord.v1.entity.Wishlist;
import ma.akenord.v1.repository.ProductRepository;
import ma.akenord.v1.repository.ReviewRepository;
import ma.akenord.v1.repository.UserRepository;
import ma.akenord.v1.repository.WishlistRepository;
import ma.akenord.v1.request.ReviewRequest;
import ma.akenord.v1.request.ReviewResponse;
import ma.akenord.v1.request.WishlistRequest;
import ma.akenord.v1.request.WishlistResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WishlistService {

    @Autowired
    private final WishlistRepository wishlistRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final ProductRepository productRepository;

    public WishlistResponse saveWishlist(WishlistRequest request){
        System.out.println(request.getUsername());
        Optional<User> user = userRepository.findById(request.getUsername());
        if(user.isPresent()){
            Product product = productRepository.findByName(request.getProduct_name());
            if(product != null){
                Optional<Wishlist> wishlist = wishlistRepository.findById(request.getUsername());
                if(wishlist.isPresent()){
                    wishlist.get().getProducts().add(product);
                    wishlistRepository.save(wishlist.get());

                }else {
                    Wishlist newWishlist = new Wishlist();

                    newWishlist.setUser(user.get());
                    newWishlist.setProducts(List.of(product));
                    newWishlist.setUsername_user(user.get().getUsername());
                    newWishlist.setCreated_at(request.getCreated_at());
                    wishlistRepository.save(newWishlist);
                }
                return WishlistResponse.builder()
                        .message("Wishlist has been save successfully")
                        .build();

            }

        }
        return WishlistResponse.builder()
                .errorMessage ("Wishlist has been Failed,Try again")
                .build();

    }

    public WishlistResponse removeProductFromWishlist(String username, String productName) {
        Optional<Wishlist> wishlist = wishlistRepository.findById(username);

        if(wishlist.isPresent()){
            // Find the Product you want to remove by its productId
            Product productToRemove = null;
            for (Product product : wishlist.get().getProducts()) {
                if (product.getName().equals(productName)) {
                    productToRemove = product;
                    break;
                }
            }
            if (productToRemove != null) {
                // Remove the product from the Wishlist's products list
                wishlist.get().getProducts().remove(productToRemove);

                // Save the updated Wishlist to the database
                wishlistRepository.save(wishlist.get());
                return WishlistResponse.builder()
                        .message("Remove Product from Wishlist has been remove successfully")
                        .build();

            }
        }
        return WishlistResponse.builder()
                .errorMessage ("Remove Product from Wishlist has been Failed,Try again")
                .build();
    }

    public boolean hasAccessToWishlist(String authenticatedUsername, String wishlistOwnerUsername) {
        return authenticatedUsername.equals(wishlistOwnerUsername);
    }
}

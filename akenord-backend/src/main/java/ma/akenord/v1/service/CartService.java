package ma.akenord.v1.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.akenord.v1.entity.*;
import ma.akenord.v1.repository.*;
import ma.akenord.v1.request.CartRequest;
import ma.akenord.v1.request.CartResponse;
import ma.akenord.v1.request.WishlistResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    @Autowired
    private final CartRepository cartRepository;

    @Autowired
    private final CartProductRepository cartProductRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final ProductRepository productRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public CartResponse saveCart(CartRequest request){
        Optional<User> user = userRepository.findById(request.getUsername());
        if(user.isPresent()){
            Product product = productRepository.findByName(request.getProduct_name());
            if(product != null){
                Optional<Cart> cart = cartRepository.findById(request.getUsername());
                CartProduct cartProduct = new CartProduct();
                if (cart.isEmpty()) {
                    cart = Optional.of(new Cart());
                    cart.get().setUser(user.get());
                    cart.get().setCreated_at(LocalDateTime.now());
                    cartRepository.save(cart.get());

                }
                cartProduct.setCart(cart.get());
                cartProduct.setProduct(product);
                cartProduct.setQuantity(request.quantity);
                cartProduct.setSize(request.getSize());
                cartProduct.setColor(request.getColor());
                cartProductRepository.save(cartProduct);
                return CartResponse.builder()
                        .message("Items has been save successfully in Cart")
                        .id(cartProduct.getId())
                        .build();

            }

        }
        return CartResponse.builder()
                .errorMessage ("Items in Cart has been Failed,Try again")
                .build();

    }


    @Transactional
    public CartResponse removeProductFromCart(String username, String id) {
        Optional<Cart> cart = cartRepository.findById(username);

        if(cart.isPresent()){
            // Find the Product you want to remove by its productId
                try {
                    // Delete the CartProduct
                    String jpql = "DELETE FROM CartProduct cp WHERE cp.id = :id";
                    int deletedCount = entityManager.createQuery(jpql)
                            .setParameter("id", Long.valueOf(id))
                            .executeUpdate();

                    if (deletedCount > 0) {
                        return CartResponse.builder()
                                .message("Remove Product from Cart has been removed successfully")
                                .build();
                    }

                } catch (Exception e) {
                    // Handle any exception here
                    e.printStackTrace();
                }
        }
        return CartResponse.builder()
                .errorMessage ("Remove Product from Cart has been Failed,Try again")
                .build();
    }


    public CartResponse updateCart(CartRequest request){
        Optional<User> user = userRepository.findById(request.getUsername());
        if(user.isPresent()){
            Product product = productRepository.findByName(request.getProduct_name());
            if(product != null){
                Optional<Cart> cart = cartRepository.findById(request.getUsername());
                CartProduct cartProduct = new CartProduct();
                if (cart.isEmpty()) {
                    cart = Optional.of(new Cart());
                    cart.get().setUser(user.get());
                    cart.get().setCreated_at(LocalDateTime.now());
                    cartRepository.save(cart.get());

                }
                cartProduct.setCart(cart.get());
                cartProduct.setProduct(product);
                cartProduct.setQuantity(request.quantity);
                cartProductRepository.save(cartProduct);
                return CartResponse.builder()
                        .message("Items has been save successfully in Cart")
                        .build();

            }

        }
        return CartResponse.builder()
                .errorMessage ("Items in Cart has been Failed,Try again")
                .build();

    }


}

package ma.akenord.v1.repository;

import jakarta.transaction.Transactional;
import ma.akenord.v1.entity.CartProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "cartProducts")
public interface CartProductRepository extends JpaRepository<CartProduct,Long> {

    CartProduct findByProductName(String name);



    @Modifying
    @Transactional
    @Query("DELETE FROM CartProduct cp WHERE cp.cart.username_user = :username")
    void deleteCartProductsByUsername(String username);

}

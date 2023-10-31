package ma.akenord.v1.repository;

import ma.akenord.v1.entity.Cart;
import ma.akenord.v1.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart,String> {

}

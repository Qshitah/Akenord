package ma.akenord.v1.repository;

import ma.akenord.v1.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {

    List<Order> findByUserUsername(String username);
}

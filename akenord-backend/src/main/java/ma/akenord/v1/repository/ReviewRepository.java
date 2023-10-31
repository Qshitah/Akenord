package ma.akenord.v1.repository;

import ma.akenord.v1.entity.Product;
import ma.akenord.v1.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(path = "reviews")
public interface ReviewRepository extends JpaRepository<Review,Long> {
    List<Review> findByProductName(String productName);
}

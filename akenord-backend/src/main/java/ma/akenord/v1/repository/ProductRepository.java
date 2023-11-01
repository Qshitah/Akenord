package ma.akenord.v1.repository;

import ma.akenord.v1.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(path = "products")
public interface ProductRepository extends JpaRepository<Product,Long> {

    List<Product> findByFeatured(@Param("featured") boolean featured , Pageable pageable);
    List<Product> findByPopular(@Param("popular") boolean popular , Pageable pageable);
    List<Product> findByHot(@Param("hot") boolean hot , Pageable pageable);
    List<Product> findByArrivals(@Param("arrivals") boolean arrivals , Pageable pageable);
    List<Product> findByTop(@Param("top") boolean top , Pageable pageable);
    List<Product> findByTrendy(@Param("trendy") boolean trendy , Pageable pageable);
    List<Product> findByDeals(@Param("deals") boolean deals , Pageable pageable);


    @Query("SELECT p FROM Product p WHERE YEAR(p.createdAt) = :year AND MONTH(p.createdAt) = :month")
    List<Product> findByCreatedAtYearAndCreatedAtMonth(@Param("year") int year, @Param("month") int month , Pageable pageable);

    Product findByName(String name);



}

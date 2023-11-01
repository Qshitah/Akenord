package ma.akenord.v1.repository;

import ma.akenord.v1.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource()
public interface WishlistRepository extends JpaRepository<Wishlist,String> {


}

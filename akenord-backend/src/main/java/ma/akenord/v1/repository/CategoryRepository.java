package ma.akenord.v1.repository;

import ma.akenord.v1.entity.Category;
import ma.akenord.v1.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(excerptProjection = CategoryDTOProjection.class)
public interface CategoryRepository extends JpaRepository<Category,Long> {

}

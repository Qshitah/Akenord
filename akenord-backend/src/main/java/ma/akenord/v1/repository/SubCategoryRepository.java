package ma.akenord.v1.repository;

import ma.akenord.v1.entity.SubCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

@RepositoryRestResource(path = "subCategories")
public interface SubCategoryRepository extends JpaRepository<SubCategory,Long> {

    @RestResource(exported = false) // Disable pagination for this specific endpoint
    @Override
    List<SubCategory> findAll();

    SubCategory findByName(String name);

}

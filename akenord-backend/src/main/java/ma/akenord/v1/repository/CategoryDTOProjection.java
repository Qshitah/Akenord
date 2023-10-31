package ma.akenord.v1.repository;

import ma.akenord.v1.entity.Category;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "categoryDTO", types = { Category.class })
public interface CategoryDTOProjection {
    Long getId();
    String getName();
    String getImage();
}

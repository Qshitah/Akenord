package ma.akenord.v1.repository;

import ma.akenord.v1.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestMapping;

@RepositoryRestResource(path = "tokens")
public interface TokenRepository extends JpaRepository<Token,Integer> {

    Token findByValue(String value);

    void deleteByValue(String value);

}

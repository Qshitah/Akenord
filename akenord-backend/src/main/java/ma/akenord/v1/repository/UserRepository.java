package ma.akenord.v1.repository;

import ma.akenord.v1.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "members")
public interface UserRepository extends JpaRepository<User,String> {

    User findByEmail(String email);

    User findByPhoneNumber(String phoneNumber);

    User findByFacebookId (String facebookId);
}

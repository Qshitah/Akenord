package ma.akenord.v1.service;
import lombok.RequiredArgsConstructor;
import ma.akenord.v1.entity.Token;
import ma.akenord.v1.entity.User;
import ma.akenord.v1.repository.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TokenService {

    @Autowired
    private final TokenRepository tokenRepository;

    public Token generateToken(User user, Token.TokenType purpose){
        Token token = new Token();

        token.setValue(generateUniqueToken());
        // Set the expiration time, for example , one hour from now
        token.setExpirationDate(LocalDateTime.now().plusHours(24));
        token.setUser(user);
        token.setType(purpose);
        token.setCreatedAt(LocalDateTime.now());

        tokenRepository.save(token);
        return token;

    }

    private String generateUniqueToken() {
        //Generate a unique token
        return UUID.randomUUID().toString();
    }

    public boolean isTokenExpired(Token verificationToken) {
        // Implement your token expiration logic here
        // You can compare the token's expiration time with the current time
        LocalDateTime expirationDateTime = verificationToken.getExpirationDate();
        LocalDateTime currentDateTime = LocalDateTime.now();
        return expirationDateTime.isBefore(currentDateTime);
    }

    @Transactional
    public void deleteTokenByValue(String value) {
        tokenRepository.deleteByValue(value);
    }

}

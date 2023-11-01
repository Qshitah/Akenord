package ma.akenord.v1.authentification;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.akenord.v1.entity.User;
import ma.akenord.v1.entity.UserInfo;

import java.util.ArrayList;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    private String token;

    private String message;

    private UserInfo user;

    private ArrayList<String> roles;

    private String errorMessage;
}

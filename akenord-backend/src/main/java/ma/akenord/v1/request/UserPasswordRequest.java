package ma.akenord.v1.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserPasswordRequest {

    private String username;

    private String password;

    private String currentPassword;

    private String newPassword;

    private String confirmNewPassword;
}

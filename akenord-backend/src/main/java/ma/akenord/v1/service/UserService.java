package ma.akenord.v1.service;

import lombok.RequiredArgsConstructor;
import ma.akenord.v1.authentification.AuthenticationResponse;
import ma.akenord.v1.entity.Token;
import ma.akenord.v1.entity.User;
import ma.akenord.v1.repository.TokenRepository;
import ma.akenord.v1.repository.UserRepository;
import ma.akenord.v1.request.ForgotPasswordRequest;
import ma.akenord.v1.request.ForgotPasswordResponse;
import ma.akenord.v1.request.ResetPasswordRequest;
import ma.akenord.v1.request.ResetPasswordResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class UserService {


    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final TokenRepository tokenRepository;

    @Autowired
    private final TokenService tokenService;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private final EmailService emailService;

    @Transactional
    public boolean verifyUser(String token){
        //Find the token in the database
        Token verificationToken = tokenRepository.findByValue(token);

        if (verificationToken != null){
            if (!tokenService.isTokenExpired(verificationToken)){
                //update the user's status to enabled
                User user = verificationToken.getUser();
                user.setEnabled(true);
                //Save the updated user
                userRepository.save(user);
                //Delete the verification token or mark it as used, depending on your requirements
                tokenRepository.delete(verificationToken);
                return true; //User Verified Successfully
            }
            
        }
        return false; //Invalid or expired token

    }


    @Transactional(propagation = Propagation.REQUIRED)
    public ResetPasswordResponse resetPassword(ResetPasswordRequest request) {
        //Find if email exists
        User user = userRepository.findByEmail(request.getEmail());
        //Find the token in the database
        Token verificationToken = tokenRepository.findByValue(request.getToken());
        if(user != null && verificationToken != null) {
            if (!tokenService.isTokenExpired(verificationToken)){

                if(Objects.equals(request.getPassword(), request.getConfirmPassword())){
                    if (!Pattern.matches("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",request.getPassword())){
                        // Encode the password before saving it to the database
                        String encodedPassword = passwordEncoder.encode(request.getPassword());

                        // Add the "{bcrypt}" prefix to the encoded password
                        user.setPassword(encodedPassword);
                        userRepository.save(user);
                        tokenRepository.delete(verificationToken);

                        return ResetPasswordResponse.builder()
                                .message("Reset Password has been successfully")
                                .email(user.getEmail())
                                .build();
                    }

                    return  ResetPasswordResponse.builder()
                            .errorMessage("Password must be at least 8 characters long and contain at least one letter and one digit.")
                            .email(user.getEmail())
                            .build();
                }
                return ResetPasswordResponse.builder()
                        .errorMessage("Password and Confirm Password not Equal")
                        .email(user.getEmail())
                        .build();

            }

            return ResetPasswordResponse.builder()
                    .errorMessage("Token has been Expired")
                    .email(user.getEmail())
                    .build();
        }

        return ResetPasswordResponse.builder()
                .errorMessage("Email or Token Not exists")
                .email(request.getEmail())
                .build();

    }

    public ForgotPasswordResponse forgotPassword(ForgotPasswordRequest request){
        User user = userRepository.findByEmail(request.getEmail());

        if(user != null){
            // Generate a verification token for the user
            Token token = tokenService.generateToken(user,Token.TokenType.password_reset);

            emailService.sendResetPassword(user.getEmail(), token);

            return ForgotPasswordResponse.builder()
                    .token(token.getValue())
                    .message("Forgot Password link has been sent to your email successfully")
                    .email(user.getEmail())
                    .build();
        }else{
            return ForgotPasswordResponse.builder()
                    .errorMessage ("Email is not exist, Please provide an exist email")
                    .build();
        }
    }


}

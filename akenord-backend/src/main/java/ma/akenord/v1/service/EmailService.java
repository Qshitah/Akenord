package ma.akenord.v1.service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import ma.akenord.v1.config.EmailConfig;
import ma.akenord.v1.entity.Token;
import ma.akenord.v1.entity.User;
import ma.akenord.v1.repository.StmpConfigRepository;
import ma.akenord.v1.repository.TokenRepository;
import ma.akenord.v1.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EmailService {

    @Autowired
    private final EmailConfig mailSender;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final StmpConfigRepository smtpConfigRepository;

    @Autowired
    private final TokenRepository tokenRepository;


    public void sendVerificationEmail(String firstName,String email, Token token){
        // Create a verification link with the token
        String verificationLink = "http://localhost:8080/api/auth/verify?token=" + token.getValue();

        String message = "Dear "+ firstName + ",\n\n"
                + "Thank you for registering with our platform Akenord. Please verify your account by clicking the link below:\n"
                + verificationLink + "\n\n"
                + "If you didn't register on our platform, you can safely ignore this email.\n\n"
                + "Best regards,\n"
                + "Akenord sarl";

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(smtpConfigRepository.findAll().get(0).getUsername());
        mailMessage.setTo(email);
        mailMessage.setSubject("Verify Your Account");
        mailMessage.setText(message);

        mailSender.javaMailSender().send(mailMessage);

    }

    public void sendResetPassword(String email, Token token){
        // Create a verification link with the token
        String verificationLink = "https://localhost:5173/reset-password?token=" + token.getValue() + "&email=" + email;

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(smtpConfigRepository.findAll().get(0).getUsername());
        mailMessage.setTo(email);
        mailMessage.setSubject("Reset Your Password");
        mailMessage.setText("Click the following link to reset your password: " + verificationLink);

        mailSender.javaMailSender().send(mailMessage);

    }



}

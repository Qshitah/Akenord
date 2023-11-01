package ma.akenord.v1.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.akenord.v1.authentification.ErrorResponse;
import ma.akenord.v1.repository.TokenRepository;
import ma.akenord.v1.request.ForgotPasswordRequest;
import ma.akenord.v1.request.ForgotPasswordResponse;
import ma.akenord.v1.request.ResetPasswordRequest;
import ma.akenord.v1.request.ResetPasswordResponse;
import ma.akenord.v1.service.TokenService;
import ma.akenord.v1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class PasswordController {

    @Autowired
    private final UserService service;

    @Autowired
    private final TokenRepository tokenRepository;

    @Autowired
    private final TokenService tokenService;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(
            @RequestBody @Valid ForgotPasswordRequest request
    ){
            ForgotPasswordResponse response = service.forgotPassword(request);

            if (response != null && response.getErrorMessage() != null) {
                // Return a BAD_REQUEST (400) response with the error message
                return ResponseEntity.badRequest().body(new ErrorResponse("Forgot Password failed", response.getErrorMessage(),400));
            }

            // Authentication succeeded
            return ResponseEntity.ok(response);

    }

    @PostMapping("/reset-password")
    @Transactional(propagation = Propagation.REQUIRED)
    public ResponseEntity<?> confirmResetPassword(
            @RequestBody @Valid ResetPasswordRequest request
    ){

        ResetPasswordResponse response = service.resetPassword(request);

        if (response != null && response.getErrorMessage() != null) {
            // Return a BAD_REQUEST (400) response with the error message
            return ResponseEntity.badRequest().body(new ErrorResponse("Reset Password failed", response.getErrorMessage(),400));
        }

        // Authentication succeeded
        return ResponseEntity.ok(response);

    }

}

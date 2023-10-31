package ma.akenord.v1.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.akenord.v1.authentification.*;
import ma.akenord.v1.exception.EmailVerificationException;
import ma.akenord.v1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    private final AuthenticationService service;

    @Autowired
    private final UserService userService;



    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody @Valid RegisterRequest request
    ) {
        try {
            // Attempt authentication
            RegisterResponse response = service.register(request);

            if (response != null && response.getErrorMessage() != null) {
                // Return a BAD_REQUEST (400) response with the error message
                return ResponseEntity.badRequest().body(new ErrorResponse("Authentication failed", response.getErrorMessage(),400));
            }

            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            // Authentication failed (incorrect password)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed", "Authentication Failed",400));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody @Valid AuthenticationRequest request
    ){

        try {
            // Attempt authentication
            AuthenticationResponse response = service.authenticate(request);

            if (response != null && response.getErrorMessage() != null) {
                // Return a BAD_REQUEST (400) response with the error message
                return ResponseEntity.badRequest().body(new ErrorResponse("Authentication failed", response.getErrorMessage(),400));
            }

            // Authentication succeeded
            return ResponseEntity.ok(response);
        }catch (DisabledException e) {
            // Handle disabled account error
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed", "Account Not Verified, Please check your email inbox for a verification link.", 401));
        } catch (AuthenticationException e) {
            // Authentication failed (incorrect username or password)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed", "Incorrect username or password", 401));
        }
    }

    @PostMapping("/loginfb")
    public ResponseEntity<?> loginfb(
            @RequestBody @Valid AuthenticationFb request
    ){

        try {
            // Attempt authentication
            AuthenticationResponse response = service.authenticateFb(request);

            if (response != null && response.getErrorMessage() != null) {
                // Return a BAD_REQUEST (400) response with the error message
                return ResponseEntity.badRequest().body(new ErrorResponse("Authentication failed", response.getErrorMessage(),400));
            }

            // Authentication succeeded
            return ResponseEntity.ok(response);
        }catch (DisabledException e) {
            // Handle disabled account error
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed", "Account Not Verified, Please check your email inbox for a verification link.", 401));
        } catch (AuthenticationException e) {
            // Authentication failed (incorrect username or password)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed", "Incorrect username or password", 401));
        }
    }

    @PostMapping("/loginG")
    public ResponseEntity<?> loginG(
            @RequestBody @Valid AuthenticationFb request
    ){

        try {
            // Attempt authentication
            AuthenticationResponse response = service.authenticateG(request);

            if (response != null && response.getErrorMessage() != null) {
                // Return a BAD_REQUEST (400) response with the error message
                return ResponseEntity.badRequest().body(new ErrorResponse("Authentication failed", response.getErrorMessage(),400));
            }

            // Authentication succeeded
            return ResponseEntity.ok(response);
        }catch (DisabledException e) {
            // Handle disabled account error
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed", "Account Not Verified, Please check your email inbox for a verification link.", 401));
        } catch (AuthenticationException e) {
            // Authentication failed (incorrect username or password)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed", "Incorrect username or password", 401));
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestParam("token") String token) {
        boolean verified = userService.verifyUser(token);
        String redirectUrl = "http://localhost:5173/login"; // URL of the React login page
        if (verified) {
            return ResponseEntity.status(HttpStatus.FOUND)
                    .header("Location", redirectUrl)
                    .body("User verified successfully. Redirecting to login...");
        }
        return ResponseEntity.badRequest()
                .header("Location", redirectUrl)
                .body("Invalid or expired token.");

    }

}






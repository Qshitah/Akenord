package ma.akenord.v1.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.akenord.v1.authentification.AuthenticationRequest;
import ma.akenord.v1.authentification.AuthenticationService;
import ma.akenord.v1.authentification.ErrorResponse;
import ma.akenord.v1.authentification.RegisterResponse;
import ma.akenord.v1.entity.User;
import ma.akenord.v1.repository.UserRepository;
import ma.akenord.v1.request.UserPasswordRequest;
import ma.akenord.v1.request.UserRequest;
import ma.akenord.v1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {


    @Autowired
    private final UserService service;

    @Autowired
    private final AuthenticationService authenticationService;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/{username}")
    public ResponseEntity<?> getUser(
            @RequestBody @Valid AuthenticationRequest request, @PathVariable String username
    ) {

        try {

            if (!Objects.equals(username, request.getUsername())){
                return ResponseEntity.badRequest().body(new ErrorResponse("Getting user information failed","Erreur",400));
            }

            RegisterResponse response = authenticationService.permissionAuthenticate(request);

            if(response != null){
                if (response.getErrorMessage() != null) {
                    // Return a BAD_REQUEST (400) response with the error message
                    return ResponseEntity.badRequest().body(new ErrorResponse("Authentication failed", response.getErrorMessage(),400));
                }

            }

            Optional<User> user = userRepository.findById(username);

            if(user.isEmpty()){
                return ResponseEntity.badRequest().body(new ErrorResponse("Authentication failed", response.getErrorMessage(),400));
            }

            User userInfo = user.get();

            // Get user information as a map
            Map<String, String> userMap = userInfo.getUserInfo();

            return ResponseEntity.ok(userMap);


        }catch (BadCredentialsException e) {
            // Authentication failed (incorrect password)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed", "Incorrect username or password",401));
        } catch (AuthenticationException e) {
            // Handle other authentication exception (e.g., locked account, disabled account)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed","Incorrect username or password",401));
        }
    }

    @PutMapping("/{username}")
    public ResponseEntity<?> updateUsername(
            @RequestBody @Valid UserRequest request, @PathVariable String username
    ) {

        try {

            if (!Objects.equals(username, request.getUsername())){
                return ResponseEntity.badRequest().body(new ErrorResponse("Getting user information failed","Erreur",400));
            }

            RegisterResponse response = authenticationService.updatePermission(request);

            if(response != null){
                if (response.getErrorMessage() != null) {
                    // Return a BAD_REQUEST (400) response with the error message
                    return ResponseEntity.badRequest().body(new ErrorResponse("Authentication failed", response.getErrorMessage(),400));
                }

            }

            Optional<User> user = userRepository.findById(username);

            if(user.isEmpty()){
                return ResponseEntity.badRequest().body(new ErrorResponse("Authentication failed", response.getErrorMessage(),400));
            }

            User userInfo = user.get();
            userInfo.setFirst_name(request.getFirst_name());
            userInfo.setLast_name(request.getLast_name());
            userInfo.setPhoneNumber(request.getPhone_number());
            userInfo.setEmail(request.getEmail());
            userInfo.setBirth_date(request.getBirth_date());
            userRepository.save(userInfo);

            return ResponseEntity.ok("You've updated your profile successfully");


        }catch (BadCredentialsException e) {
            // Authentication failed (incorrect password)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed", "Incorrect username or password",401));
        } catch (AuthenticationException e) {
            // Handle other authentication exception (e.g., locked account, disabled account)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed","Incorrect username or password",401));
        }
    }

    @PutMapping("/{username}/password")
    public ResponseEntity<?> updatePassword(
            @RequestBody @Valid UserPasswordRequest request, @PathVariable String username
    ) {

        try {

            if (!Objects.equals(username, request.getUsername())){
                return ResponseEntity.badRequest().body(new ErrorResponse("Getting user information failed","Erreur",400));
            }

            RegisterResponse response = authenticationService.updatePasswordPermission(request);

            if(response != null){
                if (response.getErrorMessage() != null) {
                    // Return a BAD_REQUEST (400) response with the error message
                    return ResponseEntity.badRequest().body(new ErrorResponse("Authentication failed", response.getErrorMessage(),400));
                }

            }

            Optional<User> user = userRepository.findById(username);

            if(user.isEmpty()){
                return ResponseEntity.badRequest().body(new ErrorResponse("Authentication failed", response.getErrorMessage(),400));
            }

            User userInfo = user.get();
            if(Objects.equals(request.getNewPassword(), request.getConfirmNewPassword())){
                if (request.getNewPassword().length() > 6){
                    // Encode the password before saving it to the database
                    String encodedPassword = passwordEncoder.encode(request.getNewPassword());

                    // Add the "{bcrypt}" prefix to the encoded password
                    userInfo.setPassword(encodedPassword);
                    userRepository.save(userInfo);

                    return ResponseEntity.ok("You've updated your profile successfully");

                }

                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ErrorResponse("Update Profile failed", "Password must be at least 8",401));

            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Update Profile failed", "Password and Confirm Password are not Equal",401));


        }catch (BadCredentialsException e) {
            // Authentication failed (incorrect password)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed", "Incorrect username or password",401));
        } catch (AuthenticationException e) {
            // Handle other authentication exception (e.g., locked account, disabled account)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed","Incorrect username or password",401));
        }
    }
}

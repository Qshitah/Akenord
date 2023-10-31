package ma.akenord.v1.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.akenord.v1.authentification.ErrorResponse;
import ma.akenord.v1.authentification.RegisterResponse;
import ma.akenord.v1.request.ProductRequest;
import ma.akenord.v1.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProductController {


    @Autowired
    private final ProductService productService;



    @PostMapping("/product/{username}")
    public ResponseEntity<?> addProduct(
            @RequestBody @Valid ProductRequest request, @PathVariable String username
    ) {

        try {

            if (!Objects.equals(username, request.getUsername())){
                return ResponseEntity.badRequest().body(new ErrorResponse("Posting Product failed","Erreur",400));
            }

            RegisterResponse response = productService.permissionToAddProduct(request);

            if(response != null){
                if (response.getErrorMessage() != null) {
                    // Return a BAD_REQUEST (400) response with the error message
                    return ResponseEntity.badRequest().body(new ErrorResponse("Authentication failed", response.getErrorMessage(),400));
                }

            }

            RegisterResponse productResponse = productService.addProduct(request,username);

            return ResponseEntity.ok(productResponse);


        }catch (BadCredentialsException e) {
            // Authentication failed (incorrect password)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed", "Incorrect username or password",401));
        } catch (AuthenticationException e) {
            // Handle other authentication exception (e.g., locked account, disabled account)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Authentication failed","Incorrect username or password",401));
        }
    }
}

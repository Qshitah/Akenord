package ma.akenord.v1.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.akenord.v1.authentification.ErrorResponse;
import ma.akenord.v1.request.ReviewRequest;
import ma.akenord.v1.request.ReviewResponse;
import ma.akenord.v1.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReviewController {

    @Autowired
    private final ReviewService service;

    @PostMapping("/review")
    public ResponseEntity<?> saveReview(
            @RequestBody @Valid ReviewRequest request
    ) {
        ReviewResponse response = service.saveReview(request);

        if (response != null && response.getErrorMessage() != null) {
            // Return a BAD_REQUEST (400) response with the error message
            return ResponseEntity.badRequest().body(new ErrorResponse("Review failed", response.getErrorMessage(),400));
        }

        // Authentication succeeded
        return ResponseEntity.ok(response);
    }


}

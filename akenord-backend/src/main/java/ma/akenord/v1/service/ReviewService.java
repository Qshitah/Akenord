package ma.akenord.v1.service;

import lombok.RequiredArgsConstructor;
import ma.akenord.v1.entity.Product;
import ma.akenord.v1.entity.Review;
import ma.akenord.v1.entity.Token;
import ma.akenord.v1.entity.User;
import ma.akenord.v1.repository.ProductRepository;
import ma.akenord.v1.repository.ReviewRepository;
import ma.akenord.v1.repository.UserRepository;
import ma.akenord.v1.request.ForgotPasswordRequest;
import ma.akenord.v1.request.ForgotPasswordResponse;
import ma.akenord.v1.request.ReviewRequest;
import ma.akenord.v1.request.ReviewResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    @Autowired
    private final ReviewRepository reviewRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final ProductRepository productRepository;

    public ReviewResponse saveReview(ReviewRequest request){
        Optional<User> user = userRepository.findById(request.getUsername());
        if(user.isPresent()){
            Product product = productRepository.findByName(request.getProduct_name());
            if(product != null){
                Review review = new Review();

                review.setUser(user.get());
                review.setProduct(product);
                review.setRating(request.getRating());
                review.setCreated_date(request.getCreated_date());
                review.setComment(request.getComment());

                reviewRepository.save(review);
            }
            return ReviewResponse.builder()
                    .message("Review  has been sent successfully")
                    .build();
        }else{
            return ReviewResponse.builder()
                    .errorMessage ("Review  has been Failed,Try again")
                    .build();
        }
    }
}

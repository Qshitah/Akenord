package ma.akenord.v1.service;

import io.micrometer.common.util.StringUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import ma.akenord.v1.authentification.RegisterResponse;
import ma.akenord.v1.entity.*;
import ma.akenord.v1.repository.ProductRepository;
import ma.akenord.v1.repository.SubCategoryRepository;
import ma.akenord.v1.repository.UserRepository;
import ma.akenord.v1.request.ProductRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    @Autowired
    private final ProductRepository productRepository;

    @Autowired
    private final SubCategoryRepository subCategoryRepository;

    @Autowired
    private final EntityManager entityManager;

    @Autowired
    private final UserRepository userRepository;

    public RegisterResponse addProduct(ProductRequest request, String username){
        Product product = new Product();

        Product nameExists = productRepository.findByName(request.getName());
        if(nameExists != null) {
            return RegisterResponse.builder()
                    .errorMessage("Name already exist")
                    .build();
        }

        product.setName(request.getName());
        product.setSku(request.getSku());
        product.setImages(request.getImages());
        product.setDescription(request.getDescription());
        product.setStock(request.getStock());
        product.setStars(0);

        List<Size> sizes = new ArrayList<>();
        for (String sizeName : request.getSizes()) {
            Size size = findSizeByName(sizeName);
            if (size == null) {
                // If the Size doesn't exist, create a new one
                size = new Size();
                size.setName(sizeName);
            }
            sizes.add(size);
        }
        product.setSizes(sizes);

        List<Color> colors = new ArrayList<>();
        for (List<String> color : request.getColors()) {
            colors.add(new Color(color.get(0), color.get(1), Color.ColorType.color,product));
        }
        for (List<String> imageColor : request.getImageColors()) {
            colors.add(new Color(imageColor.get(0),imageColor.get(1), Color.ColorType.image,product));
        }
        product.setColors(colors);

        product.setPrice(request.getPrice());
        product.setDiscountPrice(request.getDiscountPrice());
        product.setCost(request.getCost());
        product.setSubCategory(subCategoryRepository.findByName(request.getSubcategory()));
        product.setCreatedAt(LocalDateTime.now());

        Optional<User> userExist = userRepository.findById(username);
        if(userExist.isEmpty()){
            return RegisterResponse.builder()
                    .errorMessage("Authentication Failed")
                    .build();
        }
        product.setUser(userExist.get());

        productRepository.save(product);
        return RegisterResponse.builder()
                .message("You add your product successfully")
                .build();

    }


    public RegisterResponse permissionToAddProduct(ProductRequest request){

        // Perform input validation here before proceeding
        if (StringUtils.isBlank(request.getUsername())) {
            return RegisterResponse.builder()
                    .errorMessage("Username is required")
                    .build();
        }else if(StringUtils.isBlank(request.getPassword())){
            return RegisterResponse.builder()
                    .errorMessage("Password is required")
                    .build();
        }


        var user = userRepository.findById(request.getUsername()).orElseThrow();

        if(!Objects.equals(user.getPassword(), request.getPassword())) {
            return RegisterResponse.builder()
                    .errorMessage("Authentication Failed")
                    .build();
        }


        return RegisterResponse.builder()
                .message("SuccessFully Done")
                .build();

    }


    public Size findSizeByName(String sizeName) {
        // Implement your custom query here to retrieve Size by name
        // You may use EntityManager or other means to fetch the Size entity
        // Example using EntityManager:
        String jpql = "SELECT s FROM Size s WHERE s.name = :sizeName";
        TypedQuery<Size> query = entityManager.createQuery(jpql, Size.class);
        query.setParameter("sizeName", sizeName);

        try {
            return query.getSingleResult();
        } catch (NoResultException ex) {
            return null; // Size with the given name doesn't exist
        }
    }


}

package ma.akenord.v1.authentification;

import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import ma.akenord.v1.entity.Role;
import ma.akenord.v1.entity.Token;
import ma.akenord.v1.entity.User;
import ma.akenord.v1.entity.UserInfo;
import ma.akenord.v1.jwt.JwtService;
import ma.akenord.v1.repository.RoleRepository;
import ma.akenord.v1.repository.UserRepository;
import ma.akenord.v1.request.UserPasswordRequest;
import ma.akenord.v1.request.UserRequest;
import ma.akenord.v1.service.EmailService;
import ma.akenord.v1.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final RoleRepository roleRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private final JwtService jwtService;

    @Autowired
    private final AuthenticationManager authenticationManager;

    @Autowired
    private final TokenService tokenService;

    @Autowired
    private final EmailService emailService;

    public RegisterResponse register(RegisterRequest request){
        Optional<User> userExists = userRepository.findById(request.getUsername());
        // Check if a user with the same username already exists
        if (userExists.isPresent()) {
            // User with the same username already exists, send a response message
            return RegisterResponse.builder()
                    .errorMessage("Username is already exists.")
                    .build();
        }

        User emailExists = userRepository.findByEmail(request.getEmail());
        User phoneNumberExists = userRepository.findByPhoneNumber(request.getPhoneNumber());


        if (emailExists != null) {
            // User with the same username already exists, send a response message
            return RegisterResponse.builder()
                    .errorMessage("Email is already exists.")
                    .build();
        }

        if (phoneNumberExists != null) {
            // User with the same username already exists, send a response message
            return RegisterResponse.builder()
                    .errorMessage("Phone Number is already exists.")
                    .build();
        }


        Role role_user = new Role();
        Optional<Role> role_exist = roleRepository.findById("ROLE_USER");
        if (role_exist.isPresent()) {
            role_user = role_exist.get();
        }


        User user = new User();

        user.setUsername(request.getUsername());
        user.setFirst_name(request.getFirstName());
        user.setLast_name(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEnabled(false);
        user.setPhoneNumber(request.getPhoneNumber());
        user.setBirth_date(request.getBirthDate());
        user.setCreated_at(LocalDateTime.now());
        user.setRoles(List.of(role_user));

        Token token = tokenService.generateToken(user,Token.TokenType.email_verification);
        if (token != null){
            emailService.sendVerificationEmail(user.getFirst_name(),user.getEmail(), token);
            return RegisterResponse.builder()
                    .message("You create your account successfully")
                    .build();
        }

        return RegisterResponse.builder()
                .errorMessage("Registration Failed")
                .build();

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request){

        // Perform input validation here before proceeding
        if (StringUtils.isBlank(request.getUsername())) {
            return AuthenticationResponse.builder()
                    .errorMessage("Username is required")
                    .build();
        }else if(StringUtils.isBlank(request.getPassword())){
            return AuthenticationResponse.builder()
                    .errorMessage("Password is required")
                    .build();
        }


        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );


        var user = userRepository.findById(request.getUsername()).orElseThrow();

        ArrayList<String> roles = new ArrayList<>();
        for (Role role : user.getRoles()) {
            roles.add(role.getName());
        }


        UserInfo userInfo = new UserInfo(
                request.getUsername(),user.getEmail(),
                user.getFirst_name(),user.getLast_name(),
                user.getPhoneNumber(),user.getBirth_date(),
                user.getCreated_at(),user.isEnabled());


        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .user(userInfo)
                .roles(roles)
                .build();

    }

    public AuthenticationResponse authenticateFb(AuthenticationFb request){

        // Perform input validation here before proceeding
        if (StringUtils.isBlank(request.getId())) {
            return AuthenticationResponse.builder()
                    .errorMessage("Error Authentication")
                    .build();
        }
        User user = userRepository.findByFacebookId(request.getId());

        if(user == null){
            Role role_user = new Role();
            Optional<Role> role_exist = roleRepository.findById("ROLE_USER");
            if (role_exist.isPresent()) {
                role_user = role_exist.get();
            }

            Random random = new Random();

            user = new User();

            user.setUsername(request.getFirstName()+random.nextInt((300 - 100) + 1) + 100);
            user.setFirst_name(request.getFirstName());
            user.setLast_name(request.getLastName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getId()));
            user.setEnabled(true);
            user.setPhoneNumber("");
            user.setBirth_date(LocalDate.of(2000,01,01));
            user.setCreated_at(LocalDateTime.now());
            user.setRoles(List.of(role_user));
            user.setFacebookId(request.getId());
            userRepository.save(user);

        }

        ArrayList<String> roles = new ArrayList<>();
        for (Role role : user.getRoles()) {
            roles.add(role.getName());
        }


        UserInfo userInfo = new UserInfo(
                user.getUsername(),user.getEmail(),
                user.getFirst_name(),user.getLast_name(),
                user.getPhoneNumber(),user.getBirth_date(),
                user.getCreated_at(),user.isEnabled());


        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .user(userInfo)
                .roles(roles)
                .build();

    }

    public AuthenticationResponse authenticateG(AuthenticationFb request){

        // Perform input validation here before proceeding
        if (StringUtils.isBlank(request.getId())) {
            return AuthenticationResponse.builder()
                    .errorMessage("Error Authentication")
                    .build();
        }
        User user = userRepository.findByFacebookId(request.getId());

        if(user == null){
            Role role_user = new Role();
            Optional<Role> role_exist = roleRepository.findById("ROLE_USER");
            if (role_exist.isPresent()) {
                role_user = role_exist.get();
            }

            Random random = new Random();

            user = new User();

            user.setUsername(request.getFirstName()+random.nextInt((300 - 100) + 1) + 100);
            user.setFirst_name(request.getFirstName());
            user.setLast_name(request.getLastName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getId()));
            user.setEnabled(true);
            user.setPhoneNumber("");
            user.setBirth_date(LocalDate.of(2000,01,01));
            user.setCreated_at(LocalDateTime.now());
            user.setRoles(List.of(role_user));
            user.setGoogleId(request.getId());
            userRepository.save(user);

        }

        ArrayList<String> roles = new ArrayList<>();
        for (Role role : user.getRoles()) {
            roles.add(role.getName());
        }


        UserInfo userInfo = new UserInfo(
                user.getUsername(),user.getEmail(),
                user.getFirst_name(),user.getLast_name(),
                user.getPhoneNumber(),user.getBirth_date(),
                user.getCreated_at(),user.isEnabled());


        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .user(userInfo)
                .roles(roles)
                .build();

    }


    public RegisterResponse permissionAuthenticate(AuthenticationRequest request){

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

    public RegisterResponse permissionAuthenticateAdmin(AuthenticationRequest request){

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


        if(user.getRoles().stream().noneMatch(role -> "ROLE_ADMIN".equals(role.getName()))) {
            return RegisterResponse.builder()
                    .errorMessage("Only Admin can access to files")
                    .build();
        }

        return RegisterResponse.builder()
                .message("SuccessFully Done")
                .build();

    }


    public RegisterResponse updatePermission(UserRequest request){

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

    public RegisterResponse updatePasswordPermission(UserPasswordRequest request){

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

}


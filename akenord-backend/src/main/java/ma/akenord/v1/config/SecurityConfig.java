package ma.akenord.v1.config;

import lombok.RequiredArgsConstructor;
import ma.akenord.v1.jwt.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
 public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;


    @Autowired
    private final AuthenticationProvider authenticationProvider;




    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{

        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("api/products").permitAll()
                        .requestMatchers("api/products/*/reviews").permitAll()
                        .requestMatchers(HttpMethod.POST,"api/product/**").permitAll()
                        .requestMatchers("api/categories/**").permitAll()
                        .requestMatchers("api/subCategories/**").permitAll()
                        .requestMatchers("api/review/**").permitAll()
                        .requestMatchers("api/auth/**").permitAll()
                        .requestMatchers("api/wishlists/**").permitAll()
                        .requestMatchers("api/carts/**").permitAll()
                        .requestMatchers("api/cartProducts/**").permitAll()
                        .requestMatchers("api/coupons/**").permitAll()
                        .requestMatchers("api/users/**").permitAll()
                        .requestMatchers("api/orders/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"api/productsOrders").permitAll()
                        .requestMatchers("/send-email/**").permitAll()
                        .requestMatchers("api/upload").permitAll()
                        .anyRequest()
                        .authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);// Use JwtAuthenticationFilter
        return httpSecurity.build();

    }

}
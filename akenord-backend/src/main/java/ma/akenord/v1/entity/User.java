package ma.akenord.v1.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@Table(name = "users")
public class User implements UserDetails {


    @Id
    @NotNull(message = "Username is required")
    @Size(min = 3,max = 20,message = "Username length must be between 3 and 20 characters")
    @Pattern(regexp = "^[a-zA-Z0-9_-]{3,20}$",message = "Username must contain only letters, numbers, underscores, and hyphens")
    @Column(name = "username")
    private String username;

    @NotNull(message = "Email is required")
    @Size(min = 1, message = "Email is required")
    @Column(name = "email")
    private String email;

    @NotNull(message = "Password is required")
    @Size(min = 6, message = "Password Length more than 6 characters")
    @Column(name = "password")
    private String password;

    @NotNull(message = "First Name is required")
    @Size(min = 1, message = "First Name is required")
    @Column(name = "first_name")
    private String first_name;

    @NotNull(message = "Last Name is required")
    @Size(min = 1, message = "Last Name is required")
    @Column(name = "last_name")
    private String last_name;

    @Column(name = "phone_number")
    private String phoneNumber;

    @NotNull(message = "Birth Date is required")
    @Column(name = "birth_date")
    private LocalDate birth_date;

    @Column(name = "created_at")
    private LocalDateTime created_at;

    @NotNull(message = "Enabled is required")
    @Column(name = "enabled")
    private boolean enabled;

    @Column(name = "facebook_id")
    private String facebookId;

    @Column(name = "google_id")
    private String googleId;

    @ManyToMany(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,
            CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "username_user" ),
            inverseJoinColumns = @JoinColumn(name = "name_role")
    )
    private List<Role> roles;

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Token> tokens;

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Product> products;

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Review> reviews;

    @OneToOne(mappedBy = "user",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private Wishlist wishlist;

    @OneToOne(mappedBy = "user",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private Cart cart;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Address> addresses;

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.MERGE
            ,CascadeType.PERSIST
            ,CascadeType.REFRESH})
    private List<Order> orders;



    public Map<String, String> getUserInfo() {
        Map<String, String> userInfo = new HashMap<>();
        userInfo.put("first_name", this.first_name);
        userInfo.put("last_name", this.last_name);
        userInfo.put("email", this.email);
        userInfo.put("phone_number", this.phoneNumber);
        userInfo.put("birth_date", this.birth_date.toString());
        return userInfo;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName())) // Prefix roles with "ROLE_" as a convention
                .collect(Collectors.toList());
    }


    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }


    @Override
    public String toString() {
            return "{" +
                    "username='" + username + '\'' +
                    ", email='" + email + '\'' +
                    ", password='" + password + '\'' +
                    ", first_name='" + first_name + '\'' +
                    ", last_name='" + last_name + '\'' +
                    ", phone_number='" + phoneNumber + '\'' +
                    ", birth_date=" + birth_date.toString() +
                    ", created_at=" + created_at.toString()  +
                    ", enabled=" + enabled +
                    '}';

    }
}

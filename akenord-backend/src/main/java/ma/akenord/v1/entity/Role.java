package ma.akenord.v1.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "roles")
public class Role {

    @Id
    @NotNull(message = "Role Name is required")
    @Size(min = 3,max = 30,message = "Role Name length must be between 3 and 20 characters")
    @Pattern(regexp = "^[a-zA-Z]{3,30}$",message = "Role Name must contain only letters")
    @Column(name = "name")
    private String name;

    @Column(name = "created_at")
    @JsonIgnore
    private LocalDateTime created_at;

    @ManyToMany(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,
            CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "name_role" ),
            inverseJoinColumns = @JoinColumn(name = "username_user")
    )
    @JsonIgnore
    private List<User> users ;

    @Override
    public String toString() {
        return "{" +
                "name='" + name + '\'' +
                '}';
    }
}

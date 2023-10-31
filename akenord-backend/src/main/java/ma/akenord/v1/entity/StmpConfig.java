package ma.akenord.v1.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "stmp_config")
public class StmpConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "Host is required")
    @NotEmpty(message = "Host is required")
    @Column(name = "host")
    private String host;

    @NotNull(message = "Port is required")
    @NotEmpty(message = "Port is required")
    @Column(name = "port")
    private int port;

    @NotNull(message = "Email Address is required")
    @NotEmpty(message = "Email Address is required")
    @Column(name = "username")
    private String username;

    @NotNull(message = "Password is required")
    @NotEmpty(message = "Password is required")
    @Column(name = "password")
    private String password;

}

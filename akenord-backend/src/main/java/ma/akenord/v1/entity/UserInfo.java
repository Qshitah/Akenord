package ma.akenord.v1.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserInfo {

    private String username;

    private String email;

    private String first_name;

    private String last_name;

    private String phone_number;

    private LocalDate birth_date;

    private LocalDateTime created_at;

    private boolean enabled;

}

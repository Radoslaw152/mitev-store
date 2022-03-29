package bg.pgmet.mitev.store.model;

import bg.pgmet.mitev.store.model.enums.Role;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

@Data
@JsonIgnoreProperties(
        value = {
            "accountNonExpired",
            "accountNonLocked",
            "credentialsNonExpired",
            "enabled",
            "comments"
        })
@JsonPropertyOrder({"id"})
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
@Builder
@Transactional
public class User {

    private static final String DEFAULT_IMAGE = "";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Length(min = 4, max = 120, message = "Username length must be between 4 and 120")
    @Column(unique = true)
    @NotNull(message = "Username cannot be null")
    private String username;

    @Length(min = 8, max = 100, message = "Password length must be between 8 and 100")
    @NotNull(message = "Password cannot be null")
    private String password;

    @Length(min = 2, max = 30, message = "First Name length must be between 2 and 30")
    @NotNull(message = "First name cannot be null")
    private String firstName;

    @Length(min = 2, max = 30, message = "Last Name length must be between 2 and 30")
    @NotNull(message = "Last name cannot be null")
    private String lastName;

    @Builder.Default private String imageUrl = DEFAULT_IMAGE;

    private Role role;

    @OneToMany(
            fetch = FetchType.EAGER,
            mappedBy = "user",
            cascade = CascadeType.REMOVE,
            orphanRemoval = true)
    @ToString.Exclude
    private List<Comment> comments = new ArrayList<>();

    @Builder.Default private boolean active = true;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Builder.Default
    private LocalDateTime registered = LocalDateTime.now();

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Builder.Default
    private LocalDateTime updated = LocalDateTime.now();
}

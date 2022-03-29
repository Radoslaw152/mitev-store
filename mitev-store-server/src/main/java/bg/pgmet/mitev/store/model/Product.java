package bg.pgmet.mitev.store.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
@Builder
@EqualsAndHashCode(of = {"model", "id"})
@JsonIgnoreProperties(value = {"comments"})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Length(min = 1, max = 60, message = "Model name length must be between 1 and 60")
    @Column(unique = true)
    @NotNull(message = "Model cannot be null")
    private String model;

    @Length(max = 7000)
    private String description;

    @NotNull(message = "Brand type cannot be null")
    private String brandType;

    @NotNull(message = "Brand type cannot be null")
    private String graphicsCard;

    @NotNull(message = "Model type cannot be null")
    private String modelType;

    @NotNull(message = "Processor type cannot be null")
    private String processorType;

    @Min(value = 1, message = "RAM must be at least 1 GB")
    @NotNull(message = "RAM cannot be null")
    private Integer ram;

    @Min(value = 1, message = "Storage must be at least 1 GB")
    @NotNull(message = "RAM cannot be null")
    private Integer storageInGB;

    @Min(value = 1, message = "Price must be at least 1 $")
    @NotNull(message = "RAM cannot be null")
    private Double price;

    @Builder.Default private Boolean onSale = false;

    @Builder.Default
    @Min(value = 0, message = "Discount % must be at least 0")
    @Max(value = 100, message = "Discount % must be maximum 100")
    private Integer percentOff = 0;

    private String imageUrl;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Builder.Default
    private LocalDateTime released = LocalDateTime.now();

    @OneToMany(
            fetch = FetchType.EAGER,
            mappedBy = "product",
            cascade = CascadeType.REMOVE,
            orphanRemoval = true)
    @ToString.Exclude
    private List<Comment> comments = new ArrayList<>();
}

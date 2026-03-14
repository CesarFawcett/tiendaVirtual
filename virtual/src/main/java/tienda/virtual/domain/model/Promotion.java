package tienda.virtual.domain.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "promotions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private Double discountPercentage;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private boolean active;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}

package tienda.virtual.infrastructure.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import tienda.virtual.domain.model.Promotion;
import java.util.List;

public interface JpaPromotionRepository extends JpaRepository<Promotion, Long> {
    List<Promotion> findByActiveTrue();
}

package tienda.virtual.domain.repository;

import tienda.virtual.domain.model.Promotion;
import java.util.List;
import java.util.Optional;

public interface PromotionRepository {
    List<Promotion> findByActiveTrue();
    Optional<Promotion> findById(Long id);
    Promotion save(Promotion promotion);
}

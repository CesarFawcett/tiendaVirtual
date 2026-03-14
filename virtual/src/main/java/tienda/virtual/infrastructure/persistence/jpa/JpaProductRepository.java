package tienda.virtual.infrastructure.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import tienda.virtual.domain.model.Product;

public interface JpaProductRepository extends JpaRepository<Product, Long> {
}

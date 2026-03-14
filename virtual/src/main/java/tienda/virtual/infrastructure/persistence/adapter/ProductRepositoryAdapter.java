package tienda.virtual.infrastructure.persistence.adapter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import tienda.virtual.domain.model.Product;
import tienda.virtual.domain.repository.ProductRepository;
import tienda.virtual.infrastructure.persistence.jpa.JpaProductRepository;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ProductRepositoryAdapter implements ProductRepository {
    private final JpaProductRepository jpaProductRepository;

    @Override
    public List<Product> findAll() {
        return jpaProductRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        return jpaProductRepository.findById(id);
    }

    @Override
    public Product save(Product product) {
        return jpaProductRepository.save(product);
    }

    @Override
    public void deleteById(Long id) {
        jpaProductRepository.deleteById(id);
    }
}

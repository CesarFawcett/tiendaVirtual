package tienda.virtual.application.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tienda.virtual.domain.model.Product;
import tienda.virtual.domain.repository.ProductRepository;
import tienda.virtual.interfaces.dto.ProductDTO;
import tienda.virtual.interfaces.mapper.ProductMapper;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        if (products == null || products.isEmpty()) {
            return java.util.Collections.emptyList();
        }
        return productMapper.toDtoList(products);
    }

    public ProductDTO getProductById(Long id) {
        return productRepository.findById(id)
                .map(productMapper::toDto)
                .orElseThrow();
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = productMapper.toEntity(productDTO);
        return productMapper.toDto(productRepository.save(product));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}

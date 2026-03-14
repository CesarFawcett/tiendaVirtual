package tienda.virtual.interfaces.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import tienda.virtual.domain.model.Product;
import tienda.virtual.interfaces.dto.ProductDTO;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    
    ProductDTO toDto(Product product);

    @Mapping(target = "promotions", ignore = true)
    Product toEntity(ProductDTO productDTO);

    List<ProductDTO> toDtoList(List<Product> products);
}
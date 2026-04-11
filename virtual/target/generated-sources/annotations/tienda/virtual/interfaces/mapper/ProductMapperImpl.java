package tienda.virtual.interfaces.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import tienda.virtual.domain.model.Product;
import tienda.virtual.interfaces.dto.ProductDTO;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-10T13:41:53-0500",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public ProductDTO toDto(Product product) {
        if ( product == null ) {
            return null;
        }

        ProductDTO.ProductDTOBuilder productDTO = ProductDTO.builder();

        productDTO.description( product.getDescription() );
        productDTO.id( product.getId() );
        productDTO.imageUrl( product.getImageUrl() );
        productDTO.name( product.getName() );
        productDTO.price( product.getPrice() );
        productDTO.stock( product.getStock() );

        return productDTO.build();
    }

    @Override
    public Product toEntity(ProductDTO productDTO) {
        if ( productDTO == null ) {
            return null;
        }

        Product.ProductBuilder product = Product.builder();

        product.description( productDTO.getDescription() );
        product.id( productDTO.getId() );
        product.imageUrl( productDTO.getImageUrl() );
        product.name( productDTO.getName() );
        product.price( productDTO.getPrice() );
        product.stock( productDTO.getStock() );

        return product.build();
    }

    @Override
    public List<ProductDTO> toDtoList(List<Product> products) {
        if ( products == null ) {
            return null;
        }

        List<ProductDTO> list = new ArrayList<ProductDTO>( products.size() );
        for ( Product product : products ) {
            list.add( toDto( product ) );
        }

        return list;
    }
}

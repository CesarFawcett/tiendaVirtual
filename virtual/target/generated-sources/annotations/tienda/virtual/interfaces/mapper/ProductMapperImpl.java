package tienda.virtual.interfaces.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import tienda.virtual.domain.model.Product;
import tienda.virtual.interfaces.dto.ProductDTO;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-14T19:35:23-0500",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 1.4.200.v20221012-0724, environment: Java 17.0.4.1 (Eclipse Adoptium)"
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

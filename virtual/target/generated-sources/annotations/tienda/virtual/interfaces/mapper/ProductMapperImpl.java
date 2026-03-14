package tienda.virtual.interfaces.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import tienda.virtual.domain.model.Product;
import tienda.virtual.interfaces.dto.ProductDTO;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-14T16:09:52-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.9 (Oracle Corporation)"
)
@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public ProductDTO toDto(Product product) {
        if ( product == null ) {
            return null;
        }

        ProductDTO.ProductDTOBuilder productDTO = ProductDTO.builder();

        productDTO.id( product.getId() );
        productDTO.name( product.getName() );
        productDTO.description( product.getDescription() );
        productDTO.price( product.getPrice() );
        productDTO.stock( product.getStock() );
        productDTO.imageUrl( product.getImageUrl() );

        return productDTO.build();
    }

    @Override
    public Product toEntity(ProductDTO productDTO) {
        if ( productDTO == null ) {
            return null;
        }

        Product.ProductBuilder product = Product.builder();

        product.id( productDTO.getId() );
        product.name( productDTO.getName() );
        product.description( productDTO.getDescription() );
        product.price( productDTO.getPrice() );
        product.stock( productDTO.getStock() );
        product.imageUrl( productDTO.getImageUrl() );

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

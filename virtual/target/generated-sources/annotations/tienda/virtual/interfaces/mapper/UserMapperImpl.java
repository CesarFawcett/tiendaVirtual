package tienda.virtual.interfaces.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import tienda.virtual.domain.model.User;
import tienda.virtual.interfaces.dto.UserDTO;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-14T16:09:52-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.9 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDTO toDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDTO.UserDTOBuilder userDTO = UserDTO.builder();

        userDTO.id( user.getId() );
        userDTO.email( user.getEmail() );
        userDTO.name( user.getName() );
        if ( user.getRole() != null ) {
            userDTO.role( user.getRole().name() );
        }

        return userDTO.build();
    }
}

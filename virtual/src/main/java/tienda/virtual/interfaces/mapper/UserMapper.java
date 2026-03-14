package tienda.virtual.interfaces.mapper;

import org.mapstruct.Mapper;
import tienda.virtual.domain.model.User;
import tienda.virtual.interfaces.dto.UserDTO;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toDto(User user);
}

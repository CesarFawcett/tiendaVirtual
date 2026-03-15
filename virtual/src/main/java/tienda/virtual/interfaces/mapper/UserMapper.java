package tienda.virtual.interfaces.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import tienda.virtual.domain.model.User;
import tienda.virtual.interfaces.dto.UserDTO;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "balance", source = "wallet.balance")
    UserDTO toDto(User user);
}

package tienda.virtual.interfaces.mapper;

import java.math.BigDecimal;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import tienda.virtual.domain.model.User;
import tienda.virtual.domain.model.Wallet;
import tienda.virtual.interfaces.dto.UserDTO;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-10T13:41:53-0500",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.45.0.v20260224-0835, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDTO toDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDTO.UserDTOBuilder userDTO = UserDTO.builder();

        userDTO.balance( userWalletBalance( user ) );
        userDTO.email( user.getEmail() );
        userDTO.id( user.getId() );
        userDTO.name( user.getName() );
        if ( user.getRole() != null ) {
            userDTO.role( user.getRole().name() );
        }

        return userDTO.build();
    }

    private BigDecimal userWalletBalance(User user) {
        if ( user == null ) {
            return null;
        }
        Wallet wallet = user.getWallet();
        if ( wallet == null ) {
            return null;
        }
        BigDecimal balance = wallet.getBalance();
        if ( balance == null ) {
            return null;
        }
        return balance;
    }
}

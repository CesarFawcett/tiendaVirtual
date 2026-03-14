package tienda.virtual.domain.repository;

import tienda.virtual.domain.model.Wallet;
import java.util.Optional;

public interface WalletRepository {
    Optional<Wallet> findByUserId(Long userId);
    Wallet save(Wallet wallet);
}

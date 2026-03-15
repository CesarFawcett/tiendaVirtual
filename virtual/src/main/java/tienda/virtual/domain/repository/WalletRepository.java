package tienda.virtual.domain.repository;

import tienda.virtual.domain.model.Wallet;
import java.util.Optional;

public interface WalletRepository {
    Wallet save(Wallet wallet);
    Optional<Wallet> findByUserId(Long userId);
}

package tienda.virtual.infrastructure.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import tienda.virtual.domain.model.Wallet;
import java.util.Optional;

public interface JpaWalletRepository extends JpaRepository<Wallet, Long> {
    Optional<Wallet> findByUserId(Long userId);
}

package tienda.virtual.infrastructure.persistence.adapter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import tienda.virtual.domain.model.Wallet;
import tienda.virtual.domain.repository.WalletRepository;
import tienda.virtual.infrastructure.persistence.jpa.JpaWalletRepository;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class WalletRepositoryAdapter implements WalletRepository {

    private final JpaWalletRepository jpaWalletRepository;

    @Override
    public Wallet save(Wallet wallet) {
        return jpaWalletRepository.save(wallet);
    }

    @Override
    public Optional<Wallet> findByUserId(Long userId) {
        return jpaWalletRepository.findByUserId(userId);
    }
}

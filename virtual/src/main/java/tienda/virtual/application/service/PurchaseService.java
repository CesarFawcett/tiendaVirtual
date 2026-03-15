package tienda.virtual.application.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tienda.virtual.domain.model.Product;
import tienda.virtual.domain.model.User;
import tienda.virtual.domain.model.Wallet;
import tienda.virtual.domain.repository.ProductRepository;
import tienda.virtual.domain.repository.UserRepository;
import tienda.virtual.domain.repository.WalletRepository;
import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class PurchaseService {

    private final ProductRepository productRepository;
    private final WalletRepository walletRepository;
    private final UserRepository userRepository;

    @Transactional
    public void purchase(Long productId, Integer quantity, String userEmail) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (product.getStock() < quantity) {
            throw new RuntimeException("Stock insuficiente");
        }

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Wallet wallet = user.getWallet();
        BigDecimal totalCost = product.getPrice().multiply(BigDecimal.valueOf(quantity));

        if (wallet.getBalance().compareTo(totalCost) < 0) {
            throw new RuntimeException("Saldo insuficiente en la billetera");
        }

        // Descontar saldo y stock
        wallet.setBalance(wallet.getBalance().subtract(totalCost));
        product.setStock(product.getStock() - quantity);

        walletRepository.save(wallet);
        
        // Si el stock llega a 0, eliminar el producto automáticamente
        if (product.getStock() <= 0) {
            productRepository.deleteById(product.getId());
        } else {
            productRepository.save(product);
        }
    }
}

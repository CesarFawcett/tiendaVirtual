package tienda.virtual.infrastructure.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import tienda.virtual.domain.model.Role;
import tienda.virtual.domain.model.User;
import tienda.virtual.domain.model.Wallet;
import tienda.virtual.domain.repository.UserRepository;
import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "admin@tienda.com";
        String adminPass = "admin123";
        
        userRepository.findByEmail(adminEmail).ifPresentOrElse(
            admin -> {
                admin.setPassword(passwordEncoder.encode(adminPass));
                admin.setRole(Role.ROLE_ADMIN);
                userRepository.save(admin);
                System.out.println("CREDENCIALES DE ADMIN ACTUALIZADAS Y ASEGURADAS.");
            },
            () -> {
                User admin = User.builder()
                        .name("Admin Principal")
                        .email(adminEmail)
                        .password(passwordEncoder.encode(adminPass))
                        .role(Role.ROLE_ADMIN)
                        .build();

                Wallet wallet = Wallet.builder()
                        .balance(BigDecimal.valueOf(1000000))
                        .user(admin)
                        .build();

                admin.setWallet(wallet);
                userRepository.save(admin);
                System.out.println("-----------------------------------------");
                System.out.println("CUENTA DE ADMIN CREADA DESDE CERO:");
                System.out.println("Email: " + adminEmail);
                System.out.println("Password: " + adminPass);
                System.out.println("-----------------------------------------");
            }
        );
    }
}

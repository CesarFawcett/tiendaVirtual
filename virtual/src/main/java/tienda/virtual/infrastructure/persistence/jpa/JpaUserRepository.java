package tienda.virtual.infrastructure.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import tienda.virtual.domain.model.User;
import java.util.Optional;

public interface JpaUserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}

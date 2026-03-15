package tienda.virtual.domain.repository;

import tienda.virtual.domain.model.User;
import java.util.Optional;

public interface UserRepository {
    Optional<User> findByEmail(String email);
    User save(User user);
    Optional<User> findById(Long id);
    java.util.List<User> findAll();
}

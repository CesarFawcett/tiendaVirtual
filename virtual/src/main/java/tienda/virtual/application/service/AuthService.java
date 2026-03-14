package tienda.virtual.application.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tienda.virtual.domain.model.Role;
import tienda.virtual.domain.model.User;
import tienda.virtual.domain.model.Wallet;
import tienda.virtual.domain.repository.UserRepository;
import tienda.virtual.infrastructure.security.JwtService;
import tienda.virtual.infrastructure.security.SecurityUser;
import tienda.virtual.interfaces.dto.AuthRequest;
import tienda.virtual.interfaces.dto.AuthResponse;
import tienda.virtual.interfaces.mapper.UserMapper;
import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;

    @Transactional
    public AuthResponse register(AuthRequest request, String name, Role role) {
        var user = User.builder()
                .name(name)
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();
        
        var wallet = Wallet.builder()
                .balance(BigDecimal.ZERO)
                .user(user)
                .build();
        
        user.setWallet(wallet);
        var savedUser = userRepository.save(user);
        
        var jwtToken = jwtService.generateToken(new SecurityUser(savedUser));
        return AuthResponse.builder()
                .token(jwtToken)
                .user(userMapper.toDto(savedUser))
                .build();
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(new SecurityUser(user));
        return AuthResponse.builder()
                .token(jwtToken)
                .user(userMapper.toDto(user))
                .build();
    }
}

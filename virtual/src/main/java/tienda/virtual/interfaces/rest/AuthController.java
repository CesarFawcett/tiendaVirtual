package tienda.virtual.interfaces.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tienda.virtual.application.service.AuthService;
import tienda.virtual.domain.model.Role;
import tienda.virtual.interfaces.dto.AuthRequest;
import tienda.virtual.interfaces.dto.AuthResponse;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request, @RequestParam String name) {
        return ResponseEntity.ok(authService.register(request, name, Role.ROLE_USER));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/users")
    public ResponseEntity<java.util.List<tienda.virtual.interfaces.dto.UserDTO>> getUsers() {
        return ResponseEntity.ok(authService.getAllUsers());
    }

    @GetMapping("/profile")
    public ResponseEntity<tienda.virtual.interfaces.dto.UserDTO> getProfile(java.security.Principal principal) {
        return ResponseEntity.ok(authService.getProfile(principal.getName()));
    }
}

package tienda.virtual.interfaces.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import tienda.virtual.application.service.PurchaseService;
import tienda.virtual.interfaces.dto.PurchaseRequest;

@RestController
@RequestMapping("/api/purchase")
@RequiredArgsConstructor
public class PurchaseController {

    private final PurchaseService purchaseService;

    @PostMapping
    public ResponseEntity<String> purchase(@RequestBody PurchaseRequest request, Authentication authentication) {
        purchaseService.purchase(request.getProductId(), request.getQuantity(), authentication.getName());
        return ResponseEntity.ok("Compra realizada con éxito");
    }
}

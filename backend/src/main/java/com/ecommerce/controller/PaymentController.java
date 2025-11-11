package com.ecommerce.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {
    
    @PostMapping("/simulate")
    public ResponseEntity<?> simulatePayment(@RequestBody Map<String, Object> request) {
        // Simulate payment processing
        try {
            Thread.sleep(1000); // Simulate processing time
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Payment processed successfully");
            response.put("transactionId", "TXN" + System.currentTimeMillis());
            response.put("amount", request.get("amount"));
            
            return ResponseEntity.ok(response);
        } catch (InterruptedException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Payment processing failed");
            return ResponseEntity.status(500).body(response);
        }
    }
}


package com.ecommerce.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * The backend is a REST API only. Browser UI routes live on the React dev server.
 */
@Controller
public class FrontendRedirectController {

    private static final String FRONTEND_URL = "http://localhost:3000";

    @GetMapping({
            "/",
            "/login",
            "/register",
            "/products",
            "/cart",
            "/checkout",
            "/orders",
            "/admin"
    })
    public String redirectGetToFrontend(HttpServletRequest request) {
        return "redirect:" + FRONTEND_URL + request.getRequestURI();
    }

    @PostMapping({"/login", "/register"})
    public ResponseEntity<Map<String, String>> apiOnlyHint() {
        Map<String, String> body = new HashMap<>();
        body.put("error",
                "This server is the API only. Open " + FRONTEND_URL
                        + " in your browser, or call POST /api/users/login with JSON: { \"email\": \"...\", \"password\": \"...\" }");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }
}

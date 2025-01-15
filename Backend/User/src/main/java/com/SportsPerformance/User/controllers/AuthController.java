package com.SportsPerformance.User.controllers;
import com.SportsPerformance.User.dtos.LoginDto;
import com.SportsPerformance.User.dtos.RegisterDto;
import com.SportsPerformance.User.entities.User;
import com.SportsPerformance.User.responses.LoginResponse;
import com.SportsPerformance.User.services.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;


@RequestMapping("/auth")
@RestController
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/getUserIdFromToken")
    public ResponseEntity<Integer> getUserIdFromToken(@RequestParam String token){
        int userId = authService.getUserIdFromToken(token);
        return ResponseEntity.ok(userId);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterDto registerDto){
        try {
            User user = authService.registerUser(registerDto);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto){
        try {
            LoginResponse loginResponse = authService.loginUser(loginDto);
            return ResponseEntity.ok(loginResponse);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid credentials");
        }
    }

    @PostMapping("/registerCoach/admin")
    public ResponseEntity<?> registerCoach(@RequestBody RegisterDto registerDto){
        try {
            User user = authService.registerCoach(registerDto);
            return ResponseEntity.ok(user);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }
}

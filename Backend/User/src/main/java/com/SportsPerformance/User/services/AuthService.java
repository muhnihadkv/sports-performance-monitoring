package com.SportsPerformance.User.services;

import com.SportsPerformance.User.dtos.LoginDto;
import com.SportsPerformance.User.dtos.RegisterDto;
import com.SportsPerformance.User.entities.Role;
import com.SportsPerformance.User.entities.Roles;
import com.SportsPerformance.User.entities.User;
import com.SportsPerformance.User.repositories.RoleRepository;
import com.SportsPerformance.User.repositories.UserRepository;
import com.SportsPerformance.User.responses.LoginResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, RoleRepository roleRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
    }

    public int getUserIdFromToken(String token) {
        return jwtService.extractUserId(token);
    }

    public User registerUser(RegisterDto registerDto){

        if (userRepository.findByEmail(registerDto.getEmail()).isPresent()){
            throw new IllegalArgumentException("Email already exists");
        }
        Optional<Role> optionalRole = roleRepository.findByName(Roles.ATHLETE);
        if (optionalRole.isEmpty()){
            return null;
        }

        User user = new User();
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setRole(optionalRole.get());
        return userRepository.save(user);
    }

    public LoginResponse loginUser(LoginDto loginDto){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                )
        );
        User user =userRepository.findByEmail(loginDto.getEmail()).orElseThrow();

        LoginResponse loginResponse = new LoginResponse();
        String token = jwtService.generateToken(user);
        loginResponse.setToken(token);
        loginResponse.setRole(user.getRole().getName());

        return loginResponse;
    }

    public User registerCoach(RegisterDto registerDto) {
        if (userRepository.findByEmail(registerDto.getEmail()).isPresent()){
            throw new IllegalArgumentException("Email already exists");
        }

        Optional<Role> optionalRole = roleRepository.findByName(Roles.COACH);
        if (optionalRole.isEmpty()){
            return null;
        }

        User user = new User();
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setRole(optionalRole.get());

        return userRepository.save(user);
    }
}

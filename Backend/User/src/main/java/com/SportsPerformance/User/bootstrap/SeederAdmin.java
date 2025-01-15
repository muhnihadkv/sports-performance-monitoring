package com.SportsPerformance.User.bootstrap;

import com.SportsPerformance.User.dtos.RegisterDto;
import com.SportsPerformance.User.entities.Role;
import com.SportsPerformance.User.entities.Roles;
import com.SportsPerformance.User.entities.User;
import com.SportsPerformance.User.repositories.RoleRepository;
import com.SportsPerformance.User.repositories.UserRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;
@Component
public class SeederAdmin implements ApplicationListener<ContextRefreshedEvent> {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public SeederAdmin(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        this.createAdmin();
    }

    private void createAdmin() {
        RegisterDto registerDto = new RegisterDto();
        registerDto.setPassword("pwd1");
        registerDto.setEmail("admin@gmail.com");

        Optional<User> optionalUser = userRepository.findByEmail(registerDto.getEmail());
        Optional<Role> optionalRole = roleRepository.findByName(Roles.ADMIN);

        if (optionalUser.isPresent() || optionalRole.isEmpty()){
            return;
        }

        User user = new User();
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setRole(optionalRole.get());

        userRepository.save(user);

    }
}

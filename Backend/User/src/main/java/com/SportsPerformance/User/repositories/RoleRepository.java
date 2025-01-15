package com.SportsPerformance.User.repositories;
import com.SportsPerformance.User.entities.Role;
import com.SportsPerformance.User.entities.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(Roles name);
}

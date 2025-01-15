package com.SportsPerformance.Athlete.repositories;

import com.SportsPerformance.Athlete.entities.Coach;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CoachRepository extends JpaRepository<Coach, Integer> {
    Optional<Coach> findById(int coachId);
    List<Coach> findAll();
    List<Coach> findByFirstNameContainingOrLastNameContaining(String firstName, String lastName);
    Optional<Coach> findByUserId(int userId);

    boolean existsByUserId(int userId);
}

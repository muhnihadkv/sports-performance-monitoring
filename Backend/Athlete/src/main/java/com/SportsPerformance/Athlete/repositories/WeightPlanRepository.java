package com.SportsPerformance.Athlete.repositories;

import com.SportsPerformance.Athlete.entities.WeightPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WeightPlanRepository extends JpaRepository<WeightPlan, Integer> {
    Optional<WeightPlan> findByAthleteId(int athleteId);
}

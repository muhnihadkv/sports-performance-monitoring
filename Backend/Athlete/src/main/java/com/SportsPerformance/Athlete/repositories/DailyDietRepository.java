package com.SportsPerformance.Athlete.repositories;

import com.SportsPerformance.Athlete.entities.DailyDiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DailyDietRepository extends JpaRepository<DailyDiet, Integer> {
    List<DailyDiet> findByAthleteId(int athleteId);
}

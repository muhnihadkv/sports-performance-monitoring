package com.SportsPerformance.Athlete.repositories;

import com.SportsPerformance.Athlete.entities.AssistanceRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssistanceRequestRepository extends JpaRepository<AssistanceRequest, Integer> {

    boolean existsByAthlete_AthleteIdAndStatus(int athleteId, String status);


    List<AssistanceRequest> findByCoach_CoachIdAndStatus(int coachId, String status);
}

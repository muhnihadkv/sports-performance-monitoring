package com.SportsPerformance.batch3.repository;

import com.SportsPerformance.batch3.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultRepository extends JpaRepository<Result, Integer> {
    boolean existsByEvent_EventIdAndAthleteName(int eventId, String athleteName);

    Result findByEvent_EventIdAndAthleteName(int eventId, String athleteName);
}

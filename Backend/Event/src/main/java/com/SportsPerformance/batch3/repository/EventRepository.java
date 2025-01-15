package com.SportsPerformance.batch3.repository;

import com.SportsPerformance.batch3.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {
    Optional<Event> findById(Integer eventId);

    // Custom query to find the most popular category based on event count
    @Query("SELECT e.category, COUNT(e.category) FROM Event e GROUP BY e.category ORDER BY COUNT(e.category) DESC")
    List<Object[]> findMostPopularCategory();

    // The count method is already provided by JpaRepository, so no need to define it here
}


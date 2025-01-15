package com.SportsPerformance.Athlete.repositories;

import com.SportsPerformance.Athlete.entities.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AthleteRepository extends JpaRepository<Athlete, Integer> {
    Athlete findByUserId(int userId);

    @Query("SELECT s FROM Athlete s WHERE s.firstName = :firstName AND s.lastName = :lastName")
    Athlete findByFullName(@Param("firstName") String firstName, @Param("lastName") String lastName);

    boolean existsByUserId(int userId);

    @Query("SELECT a.firstName FROM Athlete a WHERE a.userId = :userId")
    String findFirstNameByUserId(@Param("userId") int userId);

    @Query("SELECT a.lastName FROM Athlete a WHERE a.userId = :userId")
    String findLastNameByUserId(@Param("userId") int userId);
}

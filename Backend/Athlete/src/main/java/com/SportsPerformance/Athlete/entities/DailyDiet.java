package com.SportsPerformance.Athlete.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class DailyDiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int athleteId;
    private LocalDateTime date;
    private int calories;
    private float currentWeight;
    private int weightPlanId;
}

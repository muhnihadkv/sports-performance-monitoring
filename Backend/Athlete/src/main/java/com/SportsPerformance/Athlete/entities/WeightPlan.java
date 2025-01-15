package com.SportsPerformance.Athlete.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class WeightPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int athleteId;
    private float startWeight;
    private float targetWeight;
    private String preference;
    private int dailyCalorieGoal;
}

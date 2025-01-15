package com.SportsPerformance.Athlete.dtos;

import lombok.Data;

@Data
public class WeightPlanDto {
    private int athleteId;
    private float startWeight;
    private float targetWeight;
    private String preference;
    private int dailyCalorieGoal;
}

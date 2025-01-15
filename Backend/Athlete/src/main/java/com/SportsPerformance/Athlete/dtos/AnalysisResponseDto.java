package com.SportsPerformance.Athlete.dtos;

import lombok.Data;

@Data
public class AnalysisResponseDto {
    private int totalAthletes;
    private int totalAchievements;
    private int totalRequests;
    private String mostActiveCategory;
}

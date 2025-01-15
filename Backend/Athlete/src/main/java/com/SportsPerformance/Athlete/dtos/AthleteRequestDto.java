package com.SportsPerformance.Athlete.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AthleteRequestDto {
    private String firstName;
    private String lastName;
    private String birthDate;
    private String gender;
    private float height;
    private float weight;
    private String category;
}

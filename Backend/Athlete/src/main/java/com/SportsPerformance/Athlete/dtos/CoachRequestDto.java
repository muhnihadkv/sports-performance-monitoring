package com.SportsPerformance.Athlete.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoachRequestDto {
    private String firstName;
    private String lastName;
    private String birthDate; // Will be converted to LocalDate in service
    private String gender;
    private String category;
}

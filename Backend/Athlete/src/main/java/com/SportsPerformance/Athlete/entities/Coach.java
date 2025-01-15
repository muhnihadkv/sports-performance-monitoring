package com.SportsPerformance.Athlete.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class Coach {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int coachId;

    private int userId;
    private String firstName;
    private String lastName;
    private LocalDate birthDate;
    private String gender;
    private String category;
    @Lob
    @Column(nullable = false,length = 1000)
    private byte[] photoUrl;
}

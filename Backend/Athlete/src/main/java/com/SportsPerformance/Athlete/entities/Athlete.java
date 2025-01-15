package com.SportsPerformance.Athlete.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Athlete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int athleteId;
    @Column(nullable = false)
    private int userId;
    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String lastName;
    @Column(nullable = false)
    private LocalDate birthDate;
    @Column(nullable = false)
    private String gender;
    @Column(nullable = false)
    private float height;
    @Column(nullable = false)
    private float weight;
    @Column(nullable = false)
    private String category;
    private int coachId;
    @Lob
    @Column(nullable = false,length = 1000)
    private byte[] photoUrl;
}

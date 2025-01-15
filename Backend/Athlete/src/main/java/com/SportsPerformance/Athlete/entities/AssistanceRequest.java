package com.SportsPerformance.Athlete.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AssistanceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int assistanceRequestId;
    
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "athleteId", referencedColumnName = "athleteId", nullable = false)
    private Athlete athlete;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "coachId", referencedColumnName = "coachId", nullable = false)
    private Coach coach;

    @Column(nullable = false)
    private String status;

    private String remarks;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDate requestDate;
}

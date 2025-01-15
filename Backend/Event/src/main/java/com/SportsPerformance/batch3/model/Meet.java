package com.SportsPerformance.batch3.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Meet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int meetId;

    @Column(nullable = false)
    private String meetName;
}

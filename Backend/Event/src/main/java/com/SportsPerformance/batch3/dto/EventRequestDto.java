package com.SportsPerformance.batch3.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class EventRequestDto {
    private String eventTitle;
    private String meetName;
    private String category;
    private LocalDate eventDate;
    private String location;
}

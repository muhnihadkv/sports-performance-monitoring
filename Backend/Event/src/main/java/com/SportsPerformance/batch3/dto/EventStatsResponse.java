package com.SportsPerformance.batch3.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventStatsResponse {
    private long totalEvents;         // Total number of events
    private String mostPopularCategory; // The most popular category among events

    public void setTotalEvents(long totalEvents) {
    }
}

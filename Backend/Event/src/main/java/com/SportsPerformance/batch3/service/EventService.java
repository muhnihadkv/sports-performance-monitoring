package com.SportsPerformance.batch3.service;

import com.SportsPerformance.batch3.dto.EventRequestDto;
import com.SportsPerformance.batch3.dto.EventStatsResponse;
import com.SportsPerformance.batch3.model.Event;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.FileSystemException;
import java.util.List;

public interface EventService {

    public Event saveEvent(Event event);
    public Event createEvent(String eventData, MultipartFile file) throws FileSystemException, JsonProcessingException;
   public Event getEventById(int eventId);
    public List<Event> getAllEvents();
    public EventStatsResponse getEventStats();
}

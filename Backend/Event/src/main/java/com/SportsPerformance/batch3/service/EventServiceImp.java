package com.SportsPerformance.batch3.service;

import com.SportsPerformance.batch3.model.Event;
import com.SportsPerformance.batch3.model.Meet;
import com.SportsPerformance.batch3.repository.EventRepository;
import com.SportsPerformance.batch3.dto.EventRequestDto;
import com.SportsPerformance.batch3.dto.EventStatsResponse;
import com.SportsPerformance.batch3.repository.MeetRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.FileSystemException;
import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImp implements EventService{


    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private MeetRepository meetRepository;
    @Autowired
    private ObjectMapper mapper;

    @Override
    public Event saveEvent(Event event) {

        return eventRepository.save(event);
    }

    @Override
    public Event createEvent(String eventData, MultipartFile file) throws FileSystemException, JsonProcessingException {

        EventRequestDto eventRequestDto = mapper.readValue(eventData, EventRequestDto.class);

        Event event = new Event();
        event.setEventTitle(eventRequestDto.getEventTitle());
        event.setMeet(meetRepository.findByMeetName(eventRequestDto.getMeetName()).orElse(null));
        event.setCategory(eventRequestDto.getCategory());
        event.setEventDate(eventRequestDto.getEventDate());
        event.setLocation(eventRequestDto.getLocation());

        try {
            event.setPhoto(file.getBytes());
        }catch (Exception e) {
            throw new FileSystemException("Failed to upload image");
        }

        return saveEvent(event);
    }
    @Override
    public Event getEventById(int eventId) {
        Optional<Event> event = eventRepository.findById(eventId);
        return event.orElse(null); // Return the event if found, otherwise null
    }


    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }


    @Override
    public EventStatsResponse getEventStats() {
        EventStatsResponse stats = new EventStatsResponse();

        // Count total events
        long totalEvents = eventRepository.count();
        System.out.println("Total Events: " + totalEvents); // Debug log
        stats.setTotalEvents(totalEvents);

        // Find the most popular category
        List<Object[]> results = eventRepository.findMostPopularCategory();
        System.out.println("Results: " + results); // Debug log

        if (results != null && !results.isEmpty()) {
            stats.setMostPopularCategory((String) results.get(0)[0]);
        } else {
            stats.setMostPopularCategory(null);
        }

        return stats;
    }


}

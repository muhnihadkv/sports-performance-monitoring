package com.SportsPerformance.batch3.service;

import com.SportsPerformance.batch3.dto.RegistrationRequestDto;
import com.SportsPerformance.batch3.model.Event;
import com.SportsPerformance.batch3.model.Registration;
import com.SportsPerformance.batch3.repository.EventRepository;
import com.SportsPerformance.batch3.repository.RegistrationRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class RegistrationService {
    private final RegistrationRepository registrationRepository;
    private final EventRepository eventRepository;
    private final WebClient.Builder builder;

    public RegistrationService(RegistrationRepository registrationRepository, EventRepository eventRepository, WebClient.Builder builder) {
        this.registrationRepository = registrationRepository;
        this.eventRepository = eventRepository;
        this.builder = builder;
    }

    public int getUserId(HttpServletRequest request){
        String token = request.getHeader("Authorization").substring(7);
        return builder.build().get()
                .uri("http://USER-SERVICE/auth/getUserIdFromToken?token=" + token)
                .retrieve().bodyToMono(Integer.class).block();
    }

    public Registration registerEvent(HttpServletRequest request, int eventId) {
        int userId = getUserId(request);

        String athleteName = builder.build().get().uri("http://ATHLETE-SERVICE/athletes/getNameByUserId/"+ userId)
                .retrieve().bodyToMono(String.class).block();


        if (registrationRepository.existsByEvent_EventIdAndAthleteName(eventId, athleteName)){
            throw new IllegalStateException("Registration request exists");
        }
        else {
            Registration registration = new Registration();
            registration.setAthleteName(athleteName);
            registration.setEvent(eventRepository.findById(eventId).orElse(null));
            registration.setStatus("pending");

            return registrationRepository.save(registration);
        }
    }

    public List<Registration> getRegistrationsByEvent(int eventId) {
        List<Registration> registrations = registrationRepository.findAllByEvent_EventId(eventId);
        if (registrations.isEmpty()){
            throw new NoSuchElementException("No registrations found with event id: "+eventId);
        }
        return registrations;
    }

    public Registration getRegistration(int registrationId) {
        return registrationRepository.findById(registrationId)
                .orElseThrow(() -> new NoSuchElementException("No registration found with id: "+registrationId));
    }

    public void approveRegistration(int registrationId) {
        Registration registration = getRegistration(registrationId);
        registration.setStatus("approved");
        registrationRepository.save(registration);
    }

    public void rejectRegistration(int registrationId) {
        Registration registration = getRegistration(registrationId);
        registration.setStatus("rejected");
        registrationRepository.save(registration);
    }

    public List<Registration> getRegistrationsByAthlete(HttpServletRequest request) {
        int userId = getUserId(request);
        String athleteName = builder.build().get().uri("http://ATHLETE-SERVICE/athletes/getNameByUserId/"+ userId)
                .retrieve().bodyToMono(String.class).block();
        List<Registration> registrations = registrationRepository.findAllByAthleteName(athleteName);
        if (registrations.isEmpty()){
            throw new NoSuchElementException("No registrations found");
        }
        return registrations;
    }

    public List<Registration> getRegistrationsByStatus(String status) {
        return registrationRepository.findAllByStatus(status);
    }
}

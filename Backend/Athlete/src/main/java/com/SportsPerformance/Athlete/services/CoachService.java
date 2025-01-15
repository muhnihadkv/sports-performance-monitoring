package com.SportsPerformance.Athlete.services;

import com.SportsPerformance.Athlete.dtos.AnalysisResponseDto;
import com.SportsPerformance.Athlete.dtos.CoachRequestDto;
import com.SportsPerformance.Athlete.entities.AssistanceRequest;
import com.SportsPerformance.Athlete.entities.Athlete;
import com.SportsPerformance.Athlete.entities.Coach;
import com.SportsPerformance.Athlete.repositories.AssistanceRequestRepository;
import com.SportsPerformance.Athlete.repositories.CoachRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CoachService {
    @Autowired
    private CoachRepository coachRepository;
    @Autowired
    private WebClient.Builder builder;
    @Autowired
    private ObjectMapper mapper;
    @Autowired
    private AssistanceRequestRepository assistanceRequestRepository;

    String url = "http://USER-SERVICE/auth/getUserIdFromToken?token=";
    public int getUserId(HttpServletRequest request){
        String token = request.getHeader("Authorization").substring(7);
        return builder.build().get().uri(url + token)
                .retrieve().bodyToMono(Integer.class).block();
    }

    public Coach createProfile(HttpServletRequest request, String coachData, MultipartFile file) throws IOException {
        int userId = getUserId(request);
        if (coachRepository.existsByUserId(userId)){
            throw new RuntimeException("user already exists");
        }

        CoachRequestDto dto = mapper.readValue(coachData, CoachRequestDto.class);

        Coach coach = new Coach();
        coach.setUserId(userId);
        coach.setFirstName(dto.getFirstName());
        coach.setLastName(dto.getLastName());
        coach.setBirthDate(LocalDate.parse(dto.getBirthDate()));
        coach.setGender(dto.getGender());
        coach.setCategory(dto.getCategory());
        coach.setPhotoUrl(file.getBytes());

        return coachRepository.save(coach);
    }

    public Coach updateProfile(HttpServletRequest request, String coachData, MultipartFile file) throws IOException {
        int userId = getUserId(request);

        CoachRequestDto dto = mapper.readValue(coachData, CoachRequestDto.class);
        Coach coach = findByUserId(userId);
        coach.setFirstName(dto.getFirstName());
        coach.setLastName(dto.getLastName());
        coach.setBirthDate(LocalDate.parse(dto.getBirthDate()));
        coach.setGender(dto.getGender());
        coach.setCategory(dto.getCategory());
        if (file != null){
            coach.setPhotoUrl(file.getBytes());
        }

        return coachRepository.save(coach);
    }

    public Coach findById(HttpServletRequest request) {
        int userId = getUserId(request);
        return findByUserId(userId);

    }

    public List<Coach> findAll() {
        return coachRepository.findAll();
    }


    public List<Coach> searchByName(String name) {
        return coachRepository.findByFirstNameContainingOrLastNameContaining(name, name);
    }

    public AnalysisResponseDto getAnalysis() {
        // Mocked data; replace with actual queries
        AnalysisResponseDto response = new AnalysisResponseDto();
        response.setTotalAthletes(50);
        response.setTotalAchievements(10);
        response.setTotalRequests(20);
        response.setMostActiveCategory("Fitness");
        return response;
    }

    public Coach findByUserId(int userId) {
        return coachRepository.findByUserId(userId)
                .orElseThrow(() -> new NoSuchElementException("Coach not found"));
    }

    public int findCoachIdByUserId(int userId){
        Coach coach = findByUserId(userId);
        return coach.getCoachId();
    }

    public List<AssistanceRequest> getAssistanceRequests(HttpServletRequest request,String status) {
        int userId = getUserId(request);
        int coachId = findCoachIdByUserId(userId);

        return assistanceRequestRepository.findByCoach_CoachIdAndStatus(coachId,status);
    }

    public String approveRequest(int requestId) {
        // Fetch the assistance request
        AssistanceRequest request = assistanceRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Assistance request not found"));


        // Set status and remarks
        request.setStatus("approved");

        // Save the updated AssistanceRequest
        assistanceRequestRepository.save(request);
        return "Request approved successfully";
    }

    public String declineRequest(int requestId) {
        AssistanceRequest request = assistanceRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Assistance request not found"));

        request.setStatus("declined");

        assistanceRequestRepository.save(request);
        return "Request declined successfully";
    }
}

package com.SportsPerformance.Athlete.services;

import com.SportsPerformance.Athlete.dtos.AssistanceRequestDto;
import com.SportsPerformance.Athlete.dtos.AthleteRequestDto;
import com.SportsPerformance.Athlete.entities.AssistanceRequest;
import com.SportsPerformance.Athlete.entities.Athlete;
import com.SportsPerformance.Athlete.repositories.AssistanceRequestRepository;
import com.SportsPerformance.Athlete.repositories.AthleteRepository;
import com.SportsPerformance.Athlete.repositories.CoachRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;


import java.io.IOException;
import java.nio.file.FileSystemException;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class AthleteService {

    private final AthleteRepository athleteRepository;
    private final ObjectMapper mapper;
    private final AssistanceRequestRepository assistanceRequestRepository;
    private final WebClient.Builder builder;
    private final CoachRepository coachRepository;


    String url = "http://USER-SERVICE/auth/getUserIdFromToken?token=";
    public AthleteService(AthleteRepository athleteRepository, ObjectMapper mapper, AssistanceRequestRepository assistanceRequestRepository, WebClient.Builder builder, CoachRepository coachRepository) {
        this.athleteRepository = athleteRepository;
        this.mapper = mapper;
        this.assistanceRequestRepository = assistanceRequestRepository;
        this.builder = builder;
        this.coachRepository = coachRepository;
    }

    public int getUserId(HttpServletRequest request){
        String token = request.getHeader("Authorization").substring(7);
        return builder.build().get().uri(url + token)
                .retrieve().bodyToMono(Integer.class).block();
    }

    public Athlete createProfile(HttpServletRequest request, String athleteData, MultipartFile file) throws IOException {
        int userId = getUserId(request);

        if (athleteRepository.existsByUserId(userId)) {
            throw new IllegalArgumentException("user already exists");
        }
        AthleteRequestDto athleteRequestDto = mapper.readValue(athleteData, AthleteRequestDto.class);

        Athlete athlete = new Athlete();
        athlete.setUserId(userId);
        athlete.setFirstName(athleteRequestDto.getFirstName());
        athlete.setLastName(athleteRequestDto.getLastName());
        athlete.setBirthDate(LocalDate.parse(athleteRequestDto.getBirthDate()));
        athlete.setGender(athleteRequestDto.getGender());
        athlete.setHeight(athleteRequestDto.getHeight());
        athlete.setWeight(athleteRequestDto.getWeight());
        athlete.setCategory(athleteRequestDto.getCategory());
        try {
            athlete.setPhotoUrl(file.getBytes());
        }catch (Exception e) {
            throw new FileSystemException("Failed to upload image");
        }
        return athleteRepository.save(athlete);
    }

    public String getNameByUserId(int userId) {

        String firstName = athleteRepository.findFirstNameByUserId(userId);
        String lastName = athleteRepository.findLastNameByUserId(userId);
        return firstName + " " + lastName;
    }

    public Athlete getAthleteById(int athleteId) {
        return athleteRepository.findById(athleteId)
                .orElseThrow(() -> new NoSuchElementException("Athlete with id:"+athleteId+" not found"));
    }

    public List<Athlete> getAll() {
        return athleteRepository.findAll();
    }

    public Athlete findAthleteByUserId(int userId){
        Athlete athlete = athleteRepository.findByUserId(userId);
        if (athlete == null) {
            throw new NoSuchElementException("Athlete not found");
        }
        return athlete;
    }

    public int findAthleteIdByUserId(int userId){
        Athlete athlete = findAthleteByUserId(userId);
        return athlete.getAthleteId();
    }

    public Athlete editAthlete(HttpServletRequest request, String athleteData, MultipartFile file) throws IOException {

        int userId = getUserId(request);

        Athlete athlete = findAthleteByUserId(userId);
        AthleteRequestDto athleteRequestDto = mapper.readValue(athleteData, AthleteRequestDto.class);
        athlete.setFirstName(athleteRequestDto.getFirstName());
        athlete.setLastName(athleteRequestDto.getLastName());
        athlete.setBirthDate(LocalDate.parse(athleteRequestDto.getBirthDate()));
        athlete.setGender(athleteRequestDto.getGender());
        athlete.setHeight(athleteRequestDto.getHeight());
        athlete.setWeight(athleteRequestDto.getWeight());
        athlete.setCategory(athleteRequestDto.getCategory());

        if (file != null){
            try {
                athlete.setPhotoUrl(file.getBytes());
            }catch (Exception e){
                throw new FileSystemException("Failed to upload image");
            }
        }

        return athleteRepository.save(athlete);
    }

    public AssistanceRequest requestAssistance(HttpServletRequest httpServletRequest,AssistanceRequestDto assistanceRequestDto) {

        int userId = getUserId(httpServletRequest);
        int athleteId = findAthleteIdByUserId(userId);
        Athlete athlete = findAthleteByUserId(userId);


        boolean existSent = assistanceRequestRepository.existsByAthlete_AthleteIdAndStatus(athleteId, "pending");
        boolean existApprove = assistanceRequestRepository.existsByAthlete_AthleteIdAndStatus(athleteId, "approved");

        if(existSent || existApprove) {
            throw new IllegalStateException("The request has already been approved or is currently pending approval");
        }
        else {
            AssistanceRequest request = new AssistanceRequest();
            request.setAthlete(athlete);
            request.setCoach(coachRepository.findById(assistanceRequestDto.getCoachId())
                    .orElseThrow(() -> new RuntimeException("Coach not found")));
            request.setStatus("pending");
            return assistanceRequestRepository.save(request);
        }

    }

    public Athlete getAthlete(HttpServletRequest request) {
        int userId = getUserId(request);
        return findAthleteByUserId(userId);
    }
}

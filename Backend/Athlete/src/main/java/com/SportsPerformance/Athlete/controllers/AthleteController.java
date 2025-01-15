package com.SportsPerformance.Athlete.controllers;

import com.SportsPerformance.Athlete.dtos.AssistanceRequestDto;
import com.SportsPerformance.Athlete.entities.AssistanceRequest;
import com.SportsPerformance.Athlete.entities.Athlete;
import com.SportsPerformance.Athlete.services.AthleteService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.FileSystemException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/athletes")
public class AthleteController {

    private final AthleteService athleteService;

    public AthleteController(AthleteService athleteService) {
        this.athleteService = athleteService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProfile(
            HttpServletRequest request,
            @RequestParam String athleteData,
            @RequestParam("file") MultipartFile file) throws IOException {
        try {
            Athlete athlete = athleteService.createProfile(request, athleteData, file);
            return ResponseEntity.ok(athlete);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }catch (FileSystemException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/getNameByUserId/{userId}")
    public ResponseEntity<String> getNameByUserId(@PathVariable int userId) {
        String name = athleteService.getNameByUserId(userId);
        return ResponseEntity.ok(name);
    }

    @GetMapping("/getById/{athleteId}")
    public ResponseEntity<?> getAthleteById(@PathVariable int athleteId) {
        try {
            Athlete athlete = athleteService.getAthleteById(athleteId);
            return ResponseEntity.ok(athlete);
        }catch (NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/getAll/admin")
    public ResponseEntity<List<Athlete>> getAll() {
        List<Athlete> athletes = athleteService.getAll();
        return ResponseEntity.ok(athletes);
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editAthlete(
            HttpServletRequest request,
            @RequestParam String athleteData,
            @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        try {
            Athlete athlete = athleteService.editAthlete(request, athleteData, file);
            return ResponseEntity.ok(athlete);
        }catch (FileSystemException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }catch (NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/getByUserId/{userId}/coach")
    public ResponseEntity<Athlete> findAthleteByUserId(@PathVariable int userId){
        Athlete athlete = athleteService.findAthleteByUserId(userId);
        return  ResponseEntity.ok(athlete);
    }

    @GetMapping("/getAthlete")
    public ResponseEntity<?> getAthlete(HttpServletRequest request){
        try {
            Athlete athlete = athleteService.getAthlete(request);
            return  ResponseEntity.ok(athlete);
        }catch (NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/getIdByUserId/{userId}/coach")
    public ResponseEntity<Integer> findAthleteIdByUserId(@PathVariable int userId){
        int athleteId = athleteService.findAthleteIdByUserId(userId);
        return ResponseEntity.ok(athleteId);
    }

    @PostMapping("/requestAssistance")
    public ResponseEntity<?> requestAssistance(HttpServletRequest httpServletRequest,
                                               @RequestBody AssistanceRequestDto assistanceRequestDto){
        try {
            AssistanceRequest request = athleteService.requestAssistance(httpServletRequest, assistanceRequestDto);
            return ResponseEntity.ok(request);
        }
        catch (IllegalStateException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("The request has already been approved or is currently pending approval");
        }
    }
}


package com.SportsPerformance.Athlete.controllers;

import com.SportsPerformance.Athlete.dtos.AnalysisResponseDto;
import com.SportsPerformance.Athlete.dtos.CoachRequestDto;
import com.SportsPerformance.Athlete.entities.AssistanceRequest;
import com.SportsPerformance.Athlete.entities.Coach;
import com.SportsPerformance.Athlete.services.CoachService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/coaches")
public class CoachController {
    @Autowired
    private CoachService coachService;

    @PostMapping("/create/coach")
    public ResponseEntity<Coach> createProfile(HttpServletRequest request,
                                               @RequestParam String dto,
                                               @RequestParam("file") MultipartFile photo) throws IOException {
        Coach coach = coachService.createProfile(request, dto, photo);
        return ResponseEntity.ok(coach);
    }

    @PutMapping("/update/coach")
    public ResponseEntity<Coach> updateProfile(HttpServletRequest request,
                                               @RequestParam String dto,
                                               @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        Coach coach = coachService.updateProfile(request,  dto, file);
        return ResponseEntity.ok(coach);
    }

    @GetMapping("/getById")
    public ResponseEntity<?> findById(HttpServletRequest request) {
        try {
            Coach coach = coachService.findById(request);
            return ResponseEntity.ok(coach);
        }catch (NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Coach>> findAll() {
        List<Coach> coaches = coachService.findAll();
        return ResponseEntity.ok(coaches);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Coach>> searchByName(@RequestParam String name) {
        List<Coach> coaches = coachService.searchByName(name);
        return ResponseEntity.ok(coaches);
    }

    @GetMapping("/analysis")
    public ResponseEntity<AnalysisResponseDto> getAnalysis() {
        AnalysisResponseDto analysis = coachService.getAnalysis();
        return ResponseEntity.ok(analysis);
    }

    @GetMapping("/requests")
    public ResponseEntity<List<AssistanceRequest>> getAssistanceRequests(HttpServletRequest request,
                                                                         @RequestBody String status) {
        List<AssistanceRequest> requests = coachService.getAssistanceRequests(request, status);
        return ResponseEntity.ok(requests);
    }

    // Approve an assistance request
    // Approve an assistance request
    @PostMapping("/approve/{requestId}/coach")
    public ResponseEntity<String> approveRequest(
            @PathVariable int requestId) {
        String response = coachService.approveRequest(requestId);
        return ResponseEntity.ok(response);
    }


    // Decline an assistance request
    @PostMapping("/decline/{requestId}/coach")
    public ResponseEntity<String> declineRequest(
            @PathVariable int requestId) {
        String response = coachService.declineRequest(requestId);
        return ResponseEntity.ok(response);
    }
}

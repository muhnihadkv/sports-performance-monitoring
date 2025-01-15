package com.SportsPerformance.batch3.controller;
import com.SportsPerformance.batch3.dto.MeetRequestDto;
import com.SportsPerformance.batch3.model.Meet;
import com.SportsPerformance.batch3.service.MeetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/meet")
public class MeetController {
    private final MeetService meetService;

    public MeetController(MeetService meetService) {
        this.meetService = meetService;
    }

    @PostMapping("/create/admin")
    public ResponseEntity<?> createMeet(@RequestBody MeetRequestDto meetRequestDto){
        try {
            Meet meet = meetService.createMeet(meetRequestDto);
            return ResponseEntity.ok(meet);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Meet>> getAllMeets(){
        List<Meet> meets = meetService.getAllMeets();
        return ResponseEntity.ok(meets);
    }

    @GetMapping("/getMeetById/{meetId}")
    public ResponseEntity<?> getMeetById(@PathVariable int meetId){
        try {
            Meet meet = meetService.getMeetById(meetId);
            return ResponseEntity.ok(meet);
        }catch (NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/update/{meetId}/admin")
    public ResponseEntity<?> updateMeet(@PathVariable int meetId, @RequestBody MeetRequestDto meetRequestDto){
        try {
            Meet meet = meetService.updateMeet(meetId, meetRequestDto);
            return ResponseEntity.ok(meet);
        }catch (NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}

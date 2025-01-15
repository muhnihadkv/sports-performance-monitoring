package com.SportsPerformance.batch3.controller;

import com.SportsPerformance.batch3.dto.ResultRequestDto;
import com.SportsPerformance.batch3.model.Result;
import com.SportsPerformance.batch3.service.ResultService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/event/result")
public class ResultController {
    private final ResultService resultService;

    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @PostMapping("/create/admin")
    public ResponseEntity<?> createResult(@RequestBody ResultRequestDto resultRequestDto){
        try {
            Result result = resultService.createResult(resultRequestDto);
            return ResponseEntity.ok(result);
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/getAll/coach")
    public ResponseEntity<List<Result>> getAllResult(){
        List<Result> results = resultService.getAllResult();
        return ResponseEntity.ok(results);
    }

    @GetMapping("/getById/{resultId}/coach")
    public ResponseEntity<?> getResultById(@PathVariable int resultId){
        try {
            Result result = resultService.getResultById(resultId);
            return ResponseEntity.ok(result);
        }catch (NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}

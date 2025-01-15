package com.SportsPerformance.Athlete.controllers;

import com.SportsPerformance.Athlete.entities.DailyDiet;
import com.SportsPerformance.Athlete.entities.WeightPlan;
import com.SportsPerformance.Athlete.services.DietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/diets")
public class DietController {
    @Autowired
    private DietService dietService;

    @PostMapping("/createWeightPlan")
    public ResponseEntity<WeightPlan> createWeightPlan(@RequestParam int athleteId,
                                                       @RequestParam float startWeight,
                                                       @RequestParam float targetWeight,
                                                       @RequestParam String preference,
                                                       @RequestParam int dailyCalorieGoal) {
        WeightPlan weightPlan = dietService.createWeightPlan(athleteId, startWeight, targetWeight, preference, dailyCalorieGoal);
        return ResponseEntity.ok(weightPlan);
    }

    @GetMapping("/getWeightPlan/{athleteId}")
    public ResponseEntity<WeightPlan> getWeightPlan(@PathVariable int athleteId) {
        WeightPlan weightPlan = dietService.getWeightPlan(athleteId);
        return ResponseEntity.ok(weightPlan);
    }

    @PutMapping("/updateWeightPlan/{athleteId}")
    public ResponseEntity<Void> updateWeightPlan(@PathVariable int athleteId,
                                                 @RequestParam float startWeight,
                                                 @RequestParam float targetWeight,
                                                 @RequestParam String preference,
                                                 @RequestParam int dailyCalorieGoal) {
        dietService.updateWeightPlan(athleteId, startWeight, targetWeight, preference, dailyCalorieGoal);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getDietByAthlete/{athleteId}")
    public ResponseEntity<List<DailyDiet>> getDietByAthlete(@PathVariable int athleteId) {
        List<DailyDiet> dailyDiets = dietService.getDietByAthlete(athleteId);
        return ResponseEntity.ok(dailyDiets);
    }

    @GetMapping("/generateMealPlan/{athleteId}")
    public ResponseEntity<String> generateMealPlan(@PathVariable int athleteId) {
        String mealPlan = dietService.generateMealPlan(athleteId);
        return ResponseEntity.ok(mealPlan);
    }
}

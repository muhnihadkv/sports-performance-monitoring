package com.SportsPerformance.Athlete.services;

import com.SportsPerformance.Athlete.entities.DailyDiet;
import com.SportsPerformance.Athlete.entities.WeightPlan;
import com.SportsPerformance.Athlete.repositories.DailyDietRepository;
import com.SportsPerformance.Athlete.repositories.WeightPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DietService {
    @Autowired
    private WeightPlanRepository weightPlanRepository;

    @Autowired
    private DailyDietRepository dailyDietRepository;

    public WeightPlan createWeightPlan(int athleteId, float startWeight, float targetWeight, String preference, int dailyCalorieGoal) {
        WeightPlan weightPlan = new WeightPlan();
        weightPlan.setAthleteId(athleteId);
        weightPlan.setStartWeight(startWeight);
        weightPlan.setTargetWeight(targetWeight);
        weightPlan.setPreference(preference);
        weightPlan.setDailyCalorieGoal(dailyCalorieGoal);

        return weightPlanRepository.save(weightPlan);
    }

    public WeightPlan getWeightPlan(int athleteId) {
        return weightPlanRepository.findByAthleteId(athleteId)
                .orElseThrow(() -> new RuntimeException("Weight Plan not found for athleteId: " + athleteId));
    }

    public void updateWeightPlan(int athleteId, float startWeight, float targetWeight, String preference, int dailyCalorieGoal) {
        WeightPlan weightPlan = getWeightPlan(athleteId);
        weightPlan.setStartWeight(startWeight);
        weightPlan.setTargetWeight(targetWeight);
        weightPlan.setPreference(preference);
        weightPlan.setDailyCalorieGoal(dailyCalorieGoal);

        weightPlanRepository.save(weightPlan);
    }

    public List<DailyDiet> getDietByAthlete(int athleteId) {
        return dailyDietRepository.findByAthleteId(athleteId);
    }

    public String generateMealPlan(int athleteId) {
        // Generate a sample meal plan; can be extended based on more specific requirements
        return "Sample meal plan generated for athlete " + athleteId;
    }
}

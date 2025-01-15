package com.SportsPerformance.batch3.service;

import com.SportsPerformance.batch3.dto.MeetRequestDto;
import com.SportsPerformance.batch3.model.Meet;
import com.SportsPerformance.batch3.repository.MeetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class MeetService {
    private final MeetRepository meetRepository;

    public MeetService(MeetRepository meetRepository) {
        this.meetRepository = meetRepository;
    }

    public Meet createMeet(MeetRequestDto meetRequestDto) {
        if (meetRepository.existsByMeetName(meetRequestDto.getMeetName())){
            throw new IllegalArgumentException("meet already exists");
        }
        Meet meet = new Meet();
        meet.setMeetName(meetRequestDto.getMeetName());
        return meetRepository.save(meet);
    }

    public List<Meet> getAllMeets() {
        return meetRepository.findAll();
    }

    public Meet getMeetById(int meetId) {
        return meetRepository.findById(meetId)
                .orElseThrow(() -> new NoSuchElementException("Meet with id:"+ meetId +" not found"));
    }

    public Meet updateMeet(int meetId, MeetRequestDto meetRequestDto) {
        Meet meet = getMeetById(meetId);
        meet.setMeetName(meetRequestDto.getMeetName());
        return meetRepository.save(meet);
    }
}

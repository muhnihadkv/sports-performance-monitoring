package com.SportsPerformance.Athlete;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
@EnableDiscoveryClient
public class AthleteApplication {

	public static void main(String[] args) {
		SpringApplication.run(AthleteApplication.class, args);
	}

	@Bean
	@LoadBalanced
	WebClient.Builder webClientBuilder(){
		return WebClient.builder();
	}
}

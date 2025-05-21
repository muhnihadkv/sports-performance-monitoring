# Sports Performance Monitoring and Event Management System

A web-based platform built with **Spring Boot** to help coaches, athletes, and administrators monitor training, publish event results, and manage overall sports activities efficiently.

## Features

- **Coach-Based Performance Monitoring**
  - Coaches can log training progress and observations.
  - Personalized tracking of athlete development.

- **Diet Plan Management**
  - Coaches can assign and update diet plans for athletes.

- **Event Management**
  - Create and manage sports events and competitions.
  - Register athletes and manage schedules.

- **Result Publishing**
  - Publish and view results for events.
  - Accessible by all relevant stakeholders.

- **User Roles**
  - Role-based access for Admins, Coaches, and Athletes.
  - Secure login and registration with JWT authentication.

- **Technology Stack**
  - Backend: Spring Boot, Spring Security (JWT)
  - Database: MySQL
  - Build Tool: Maven
  - REST API tested with Postman

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sports-monitoring-system.git
   cd sports-monitoring-system
2. **Build and Run**
   ```bash
   mvn clean install
   mvn spring-boot:run

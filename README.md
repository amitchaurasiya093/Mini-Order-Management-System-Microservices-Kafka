# 🚀 Mini Order Management System — Microservices + Apache Kafka

A **Mini Order Management System** built using **Spring Boot Microservices, Apache Kafka, JWT Authentication, MySQL, Eureka Service Discovery, and Thymeleaf**.

The project demonstrates how multiple independent microservices communicate with each other and how **Apache Kafka** can be used for asynchronous event-driven communication.

## 📌 Project Overview

This project is a small-scale **Order Management System** designed using a Microservices Architecture.

The system contains:

* 🔐 Authentication & Authorization
* 👤 User Registration & Login
* 🔑 JWT-based Authentication
* 📦 Order Management / CRUD
* 📨 Apache Kafka Event Publishing
* 🔔 Kafka-based Notification Consumer
* 🔎 Eureka Service Discovery
* 🗄️ MySQL Database
* 🌐 Spring Boot + Thymeleaf Frontend

### Main Flow

                         ┌─────────────────────┐
                         │      Browser        │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Frontend :8080      │
                         │ Spring Boot         │
                         │ Thymeleaf           │
                         └──────────┬──────────┘
                                    │
                     ┌──────────────┴──────────────┐
                     │                             │
                     ▼                             ▼
            ┌─────────────────┐          ┌─────────────────┐
            │ Auth Service    │          │ Order Service   │
            │ :8081           │          │ :8082           │
            │                 │          │                 │
            │ JWT             │          │ JWT Validation  │
            │ Login/Register  │          │ Order CRUD      │
            └────────┬────────┘          └────────┬────────┘
                     │                            │
                     │                            │ Kafka Producer
                     │                            ▼
                     │                   ┌──────────────────┐
                     │                   │ Apache Kafka     │
                     │                   │ :9092            │
                     │                   │                  │
                     │                   │ order-created    │
                     │                   └────────┬─────────┘
                     │                            │
                     │                            │ Consumer
                     │                            ▼
                     │                   ┌──────────────────┐
                     │                   │ Notification     │
                     │                   │ Service :8083    │
                     │                   └──────────────────┘
                     │
                     ▼
              ┌──────────────┐
              │ MySQL        │
              │ Auth DB      │
              └──────────────┘

              ┌─────────────────────┐
              │ Eureka Server :8761 │
              │ Service Discovery   │
              └─────────────────────┘

# ✨ Features

## 🔐 Authentication Service

* User Registration
* User Login
* JWT Token Generation
* JWT Token Validation
* Protected Profile API
* Spring Security
* Password-based authentication
* MySQL persistence

## 📦 Order Service

* Create Order
* Get All Orders
* Get Order by ID
* Update Order
* Delete Order
* JWT Authentication
* User-specific order handling
* Kafka event publishing

## 📨 Kafka Integration

When an order is created:

Order Service
      ↓
Kafka Producer
      ↓
order-created topic
      ↓
Kafka Consumer
      ↓
Notification Service

The order event contains information such as:

{
  "orderId": 5,
  "productName": "Vivo T4R 5G",
  "quantity": 4,
  "price": 26300.0,
  "username": "amit"
}

## 🔔 Notification Service

The Notification Service consumes order events from Kafka.

It listens to:

order-created

Kafka topic and processes newly created orders asynchronously.


# 🛠️ Technologies Used

| Technology                  | Purpose                        |
| --------------------------- | ------------------------------ |
| Java 17                     | Programming Language           |
| Spring Boot                 | Backend Framework              |
| Spring Security             | Authentication & Authorization |
| JWT                         | Token-based Authentication     |
| Spring Data JPA             | Database Access                |
| Hibernate                   | ORM                            |
| MySQL                       | Database                       |
| Apache Kafka                | Event-driven Communication     |
| Spring Kafka                | Kafka Integration              |
| Eureka Server               | Service Discovery              |
| Spring Cloud Netflix Eureka | Microservices Discovery        |
| Thymeleaf                   | Frontend                       |
| HTML/CSS                    | UI                             |
| JavaScript                  | Frontend Logic                 |
| Maven                       | Build Tool                     |
| Git & GitHub                | Version Control                |


# 🏗️ Microservices

## 1. Eureka Server

**Port:** `8761`

Responsible for service discovery.

Registered services:

AUTH-SERVICE
ORDER-SERVICE
NOTIFICATION-SERVICE

Eureka Dashboard:

http://localhost:8761

## 2. Auth Service

**Port:** `8081`

Responsibilities:

* Registration
* Login
* JWT generation
* JWT authentication
* User profile

Database:

mini_order_system_auth_db


## 3. Order Service

**Port:** `8082`

Responsibilities:

* Order CRUD
* JWT validation
* Kafka Producer
* Order persistence

Database:

mini_order_system_order_db

Kafka Topic:

order-created


## 4. Notification Service

**Port:** `8083`

Responsibilities:

* Kafka Consumer
* Consume order-created events
* Process order notifications

## 5. Frontend

**Port:** `8080`

Built using:

* Spring Boot
* Thymeleaf
* HTML
* CSS
* JavaScript

Frontend pages include:

Login
Register
Dashboard
Orders
Create Order
Edit Order
Profile

# 📁 Project Structure

Mini-Order-System-Using Kafka
│
├── .gitignore
│
├── auth-service
│   ├── src
│   ├── pom.xml
│   └── mvnw
│
├── eureka-server
│   ├── src
│   ├── pom.xml
│   └── mvnw
│
├── frontend
│   ├── src
│   ├── pom.xml
│   └── mvnw
│
├── notification-service
│   ├── src
│   ├── pom.xml
│   └── mvnw
│
└── order-service
    ├── src
    ├── pom.xml
    └── mvnw


# 🔄 Application Flow

### 1️⃣ User Registration

Browser
   ↓
Frontend
   ↓
Auth Service
   ↓
MySQL

User registration data is stored in the Auth database.

### 2️⃣ User Login

Browser
   ↓
Frontend
   ↓
Auth Service
   ↓
JWT Token
   ↓
Frontend

After successful login, the Auth Service generates a JWT token.

### 3️⃣ Create Order

Frontend
   ↓
JWT Token
   ↓
Order Service
   ↓
MySQL
   ↓
Kafka Producer
   ↓
order-created


### 4️⃣ Notification

Kafka
   ↓
order-created
   ↓
Notification Service
   ↓
Process Notification

This demonstrates **asynchronous communication** between microservices.


# 🔐 Environment Variables

Sensitive information such as database credentials and JWT secret should not be committed to GitHub.

The application uses environment variables:

DB_USERNAME
DB_PASSWORD
JWT_SECRET

Example local configuration:

DB_USERNAME=root
DB_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret

> ⚠️ Never commit real passwords, JWT secrets, API keys, or other credentials to GitHub.


# 🗄️ Database Configuration

Create the following MySQL databases:

CREATE DATABASE mini_order_system_auth_db;

CREATE DATABASE mini_order_system_order_db;

The application uses Spring Boot JPA/Hibernate to create and update tables automatically.

# 📨 Kafka Configuration

Kafka runs on:

localhost:9092

Main Kafka topic:

order-created

### Start Kafka

Navigate to your Kafka installation directory and start the Kafka server.

Example:

cd /c/kafka
./bin/windows/kafka-server-start.bat config/server.properties

### Consume Kafka Events

./bin/windows/kafka-console-consumer.bat --topic order-created --from-beginning --bootstrap-server localhost:9092


# ▶️ How to Run the Project

Start the components in the following order.

## Step 1 — Start MySQL

Make sure MySQL Server is running.

Create databases:

CREATE DATABASE mini_order_system_auth_db;

CREATE DATABASE mini_order_system_order_db;


## Step 2 — Start Kafka

Make sure Kafka is running on:

localhost:9092


## Step 3 — Start Eureka Server

Navigate to:

eureka-server

Run:

.\mvnw.cmd spring-boot:run

Eureka Dashboard:

http://localhost:8761

## Step 4 — Start Auth Service

Navigate to:

auth-service

Run:

.\mvnw.cmd spring-boot:run

Service:

http://localhost:8081


## Step 5 — Start Order Service

Navigate to:

order-service

Run:

.\mvnw.cmd spring-boot:run

Service:

http://localhost:8082

## Step 6 — Start Notification Service

Navigate to:

notification-service

Run:

.\mvnw.cmd spring-boot:run

Service:

http://localhost:8083

## Step 7 — Start Frontend

Navigate to:

frontend

Run:

.\mvnw.cmd spring-boot:run

Open:

http://localhost:8080

# 🔗 Important Service URLs

| Service              | URL                     |
| -------------------- | ----------------------- |
| Frontend             | `http://localhost:8080` |
| Eureka Server        | `http://localhost:8761` |
| Auth Service         | `http://localhost:8081` |
| Order Service        | `http://localhost:8082` |
| Notification Service | `http://localhost:8083` |


# 🔑 Authentication APIs

## Register

POST /auth/register

Example:

{
  "username": "amit",
  "password": "123456"
}

## Login

POST /auth/login

Example:

{
  "username": "amit",
  "password": "123456"
}

Response contains a JWT token.

## Profile

GET /auth/profile

Header:

Authorization: Bearer <JWT_TOKEN>

# 📦 Order APIs

## Create Order

POST /orders

Header:

Authorization: Bearer <JWT_TOKEN>

## Get All Orders

GET /orders

Header:

Authorization: Bearer <JWT_TOKEN>

## Get Order by ID

GET /orders/{id}

## Update Order

PUT /orders/{id}

## Delete Order

DELETE /orders/{id}

# 🧪 Testing

The APIs can be tested using:

* Postman
* Browser
* Frontend UI

Recommended testing sequence:

1. Register
      ↓
2. Login
      ↓
3. Receive JWT
      ↓
4. Create Order
      ↓
5. Order saved in MySQL
      ↓
6. Kafka event published
      ↓
7. Notification Service consumes event


# 🎯 Learning Objectives

This project demonstrates practical implementation of:

* Microservices Architecture
* Service Discovery
* REST APIs
* JWT Authentication
* Spring Security
* Database Integration
* Kafka Producer
* Kafka Consumer
* Event-driven Architecture
* Asynchronous Communication
* CRUD Operations
* Frontend-Backend Integration
* CORS Configuration
* Maven Multi-Service Projects
* Git & GitHub


# 🚀 Future Enhancements

Possible improvements:

* API Gateway using Spring Cloud Gateway
* Centralized Configuration Server
* Docker & Docker Compose
* Redis Caching
* Email Notification Service
* Real-time notifications using WebSocket
* Payment Service
* Distributed Tracing with Zipkin/Micrometer
* Centralized logging
* Kubernetes deployment
* CI/CD using GitHub Actions


# 👨‍💻 Author

**Amit Kumar Chaurasiya**

Java Full Stack Developer | Java Developer | Software Developer

GitHub:

[@amitchaurasiya093](https://github.com/amitchaurasiya093)


# ⭐ Project Highlights

Spring Boot Microservices
        +
Spring Security + JWT
        +
MySQL
        +
Eureka Service Discovery
        +
Apache Kafka
        +
Thymeleaf Frontend
        =
Mini Order Management System

If you find this project useful, consider giving the repository a ⭐ on GitHub.

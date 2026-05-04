# Velora Backend API Documentation

Welcome to the official API documentation for the **Velora Backend**. This service is built with Node.js and Express, supporting the core entities of the Velora platform: **Users** (Passengers) and **Captains** (Drivers). 

This guide details the available RESTful endpoints, their required payloads, and expected responses.

## Base URL

By default, the server runs on the port specified in your `.env` file (usually `http://localhost:3000` or `http://localhost:4000`). All API endpoints are relative to this base URL.

---

## 🧑‍💼 User (Passenger) API

APIs related to passenger registration, authentication, and profile management.
**Base Path:** `/users`

### 1. Register a new user
Registers a new user on the Velora platform.

- **URL:** `/users/register`
- **Method:** `POST`
- **Body (JSON):**
  ```json
  {
    "name": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }
  ```
- **Responses:**
  - `201 Created`: Returns the user object and a JWT authentication token.
  - `400 Bad Request`: Validation errors (e.g., missing fields, invalid email format, password too short).

### 2. Login User
Authenticates an existing user and returns an access token.

- **URL:** `/users/login`
- **Method:** `POST`
- **Body (JSON):**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }
  ```
- **Responses:**
  - `200 OK`: Returns the user details and a JWT token.
  - `400 / 401`: Invalid email or password.

### 3. Get User Profile
Retrieves the logged-in user's profile data.

- **URL:** `/users/profile`
- **Method:** `GET`
- **Headers:** 
  - `Authorization: Bearer <your_jwt_token>` (or via cookies)
- **Responses:**
  - `200 OK`: Returns the user's profile information.
  - `401 Unauthorized`: Token is missing or invalid.

### 4. Logout User
Logs the user out by blacklisting their token or clearing auth cookies.

- **URL:** `/users/logout`
- **Method:** `GET`
- **Headers:** 
  - `Authorization: Bearer <your_jwt_token>` (or via cookies)
- **Responses:**
  - `200 OK`: Logged out successfully.

---

## 🚗 Captain (Driver) API

APIs related to driver (Captain) registration, vehicle assignment, authentication, and profile operations.
**Base Path:** `/captains`

### 1. Register a new Captain
Registers a new driver and their associated vehicle.

- **URL:** `/captains/register`
- **Method:** `POST`
- **Body (JSON):**
  ```json
  {
    "name": {
      "firstname": "James",
      "lastname": "Smith"
    },
    "email": "captain.james@example.com",
    "password": "securepassword123",
    "vehicles": {
      "color": "Black",
      "plate": "XYZ-9876",
      "capacity": 3,
      "vehicletype": "car"
    }
  }
  ```
- **Responses:**
  - `201 Created`: Returns the captain object and a JWT authentication token.
  - `400 Bad Request`: Validation errors or Captain already exists.

### 2. Login Captain
Authenticates a registered captain and returns an access token.

- **URL:** `/captains/login`
- **Method:** `POST`
- **Body (JSON):**
  ```json
  {
    "email": "captain.james@example.com",
    "password": "securepassword123"
  }
  ```
- **Responses:**
  - `200 OK`: Returns the captain details and a JWT token.
  - `400 / 401`: Invalid email or password.

### 3. Get Captain Profile
Retrieves the logged-in captain's profile and vehicle information.

- **URL:** `/captains/profile`
- **Method:** `GET`
- **Headers:** 
  - `Authorization: Bearer <your_jwt_token>` (or via cookies)
- **Responses:**
  - `200 OK`: Returns the captain's profile information.
  - `401 Unauthorized`: Token is missing or invalid.

### 4. Logout Captain
Logs the captain out securely.

- **URL:** `/captains/logout`
- **Method:** `POST`
- **Headers:** 
  - `Authorization: Bearer <your_jwt_token>` (or via cookies)
- **Responses:**
  - `200 OK`: Logged out successfully.

---

## Authentication & Security

This API implements JWT (JSON Web Tokens) for security. 
- Ensure that the generated token from `login` or `register` routes is passed in the `Authorization` header as `Bearer <token>` on all protected routes (`/profile`, `/logout`).
- Input validation is tightly implemented on the backend relying on `express-validator`. Any requests formatted improperly will be rejected automatically with standard `400` errors detailing the specific required inputs.

---
_Developed for the Velora Platform._
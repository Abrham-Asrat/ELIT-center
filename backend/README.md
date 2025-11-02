# ELIT ENT Center - Backend Documentation

This document provides guidelines and specifications for implementing the backend for the ELIT ENT Center Angular application.

## Overview

The backend for the ELIT ENT Center serves as the API layer for the frontend application, handling user authentication, appointment management, user roles, and medical services data.

## Tech Stack Recommendations

- **Runtime Environment**: .NET 8
- **Web Framework**: ASP.NET Core Web API
- **Database**: SQL Server or PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **API Architecture**: RESTful API

## Prerequisites

- .NET 8 SDK or higher
- Visual Studio or Visual Studio Code
- SQL Server or PostgreSQL
- Git

## Project Structure

```
backend/
├── Controllers/
├── Models/
├── Data/
├── DTOs/
├── Services/
├── Interfaces/
├── appsettings.json
├── Program.cs
└── ELIT.ENT.Center.Backend.csproj
```

## Setup Instructions

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Restore dependencies:

   ```
   dotnet restore
   ```

3. Update the `appsettings.json` file with your database connection string and JWT settings:

   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=ELIT_ENT_Center;Trusted_Connection=true;TrustServerCertificate=true;"
     },
     "Jwt": {
       "Key": "your_jwt_secret_key_here_at_least_32_characters_long",
       "Issuer": "ELIT_ENT_Center",
       "Audience": "ELIT_ENT_Center_Users",
       "ExpireDays": 30
     }
   }
   ```

4. Run database migrations (if using Entity Framework):

   ```
   dotnet ef database update
   ```

5. Start the development server:
   ```
   dotnet run
   ```

## Database Schema

### Users Table

```csharp
public class User
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Role { get; set; } // 'super_admin', 'sub_admin', 'patient'
    public string PasswordHash { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
```

### Appointments Table

```csharp
public class Appointment
{
    public int Id { get; set; }
    public int PatientId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public DateTime DateOfBirth { get; set; }
    public DateTime PreferredDate { get; set; }
    public string PreferredTime { get; set; }
    public string ServiceType { get; set; }
    public string Reason { get; set; }
    public string Symptoms { get; set; }
    public bool PreviousPatient { get; set; }
    public string Insurance { get; set; }
    public string EmergencyContact { get; set; }
    public string EmergencyPhone { get; set; }
    public string Notes { get; set; }
    public string Status { get; set; } // 'pending', 'confirmed', 'cancelled', 'completed'
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
```

### Services Table

```csharp
public class Service
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Duration { get; set; } // in minutes
    public decimal Price { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
```

## API Endpoints

### Authentication

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| POST   | `/api/auth/login`   | User login             |
| POST   | `/api/auth/logout`  | User logout            |
| GET    | `/api/auth/profile` | Get authenticated user |

### Users

| Method | Endpoint          | Description           |
| ------ | ----------------- | --------------------- |
| GET    | `/api/users`      | Get all users (Admin) |
| POST   | `/api/users`      | Create new user       |
| GET    | `/api/users/{id}` | Get specific user     |
| PUT    | `/api/users/{id}` | Update user           |
| DELETE | `/api/users/{id}` | Delete user           |

### Appointments

| Method | Endpoint                 | Description              |
| ------ | ------------------------ | ------------------------ |
| GET    | `/api/appointments`      | Get all appointments     |
| POST   | `/api/appointments`      | Create new appointment   |
| GET    | `/api/appointments/{id}` | Get specific appointment |
| PUT    | `/api/appointments/{id}` | Update appointment       |
| DELETE | `/api/appointments/{id}` | Delete appointment       |

### Services

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| GET    | `/api/services`      | Get all services     |
| POST   | `/api/services`      | Create new service   |
| GET    | `/api/services/{id}` | Get specific service |
| PUT    | `/api/services/{id}` | Update service       |
| DELETE | `/api/services/{id}` | Delete service       |

## User Roles and Permissions

1. **Super Admin** (`super_admin`)

   - Full access to all system features
   - User management
   - System configuration

2. **Sub Admin** (`sub_admin`)

   - Appointment management
   - Patient record access
   - Service management

3. **Patient** (`patient`)
   - Book appointments
   - View own appointments
   - Update profile

## Security Considerations

- All passwords must be hashed before storing (using ASP.NET Core Identity or BCrypt)
- Implement rate limiting to prevent abuse
- Use HTTPS in production
- Validate and sanitize all inputs
- Implement proper CORS policies
- Regularly update NuGet packages
- Use parameterized queries to prevent SQL injection

## Integration with Frontend

The frontend application expects the backend to be running on `http://localhost:5000` or `https://localhost:5001` (default for ASP.NET Core). Update the Angular services to make HTTP requests to the appropriate endpoints instead of using the current simulated responses.

## Deployment

1. Publish the application:
   ```
   dotnet publish -c Release
   ```
2. Deploy to IIS, Azure, or other hosting platforms
3. Configure environment variables appropriately for production
4. Set up reverse proxy with Nginx or IIS (optional)
5. Configure SSL certificate for HTTPS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

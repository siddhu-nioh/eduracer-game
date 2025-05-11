# EduRacer 🏎️

A gamified web-based learning platform for children ages 4-10.

## Overview
EduRacer combines education with entertainment through an engaging racing game where children learn various concepts while steering a car to collect correct answers.

## Features
- Multiple learning modes (Alphabet, Numbers, Math, Colors, etc.)
- Adaptive difficulty system
- Progress tracking
- Interactive 2D racing gameplay
- Child-friendly interface

## Tech Stack
- Frontend: HTML, CSS, JavaScript, Phaser.js, Tailwind CSS
- Backend: Java Spring Boot
- Database: MySQL/PostgreSQL

## Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 14 or higher
- MySQL 8.0 or higher

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Update MySQL credentials in `src/main/resources/application.properties`
3. Build and run the application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend-react`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Default Credentials
- Admin: username: `admin`, password: `password`
- Student: username: `student1`, password: `password`

## Project Structure
```
eduracer/
├── frontend-react/    # React frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API services
│   │   └── assets/      # Static assets
│   └── public/          # Public assets
└── backend/            # Spring Boot backend
    └── src/
        └── main/
            ├── java/
            │   └── com/
            │       └── eduracer/
            │           ├── controller/  # REST controllers
            │           ├── model/       # Entity classes
            │           ├── repository/  # Data repositories
            │           └── service/     # Business logic
            └── resources/
                └── application.properties  # Configuration
```

## Deployment

### Frontend Deployment
1. The frontend is automatically deployed to Netlify at https://eduracer-game.windsurf.build
2. Environment variables are managed through `.env.development` and `.env.production`
3. To deploy manually:
   ```bash
   cd frontend-react
   npm run build
   # Deploy the build folder to Netlify
   ```

### Backend Deployment
1. Build the Docker image:
   ```bash
   cd backend
   docker build -t eduracer-backend .
   ```

2. Deploy using Docker Compose:
   ```bash
   # Create a .env file with your configuration
   echo "MYSQL_ROOT_PASSWORD=your-secure-password" > .env
   echo "JWT_SECRET=your-jwt-secret" >> .env
   echo "CORS_ALLOWED_ORIGINS=https://eduracer-game.windsurf.build" >> .env

   # Start the services
   docker-compose up -d
   ```

3. Alternative deployment options:
   - Deploy to AWS Elastic Beanstalk
   - Deploy to Google Cloud Run
   - Deploy to Azure App Service

### Environment Variables

#### Frontend (.env.production)
- `REACT_APP_API_URL`: Backend API URL

#### Backend
- `MYSQL_ROOT_PASSWORD`: MySQL root password
- `JWT_SECRET`: Secret key for JWT tokens
- `CORS_ALLOWED_ORIGINS`: Allowed frontend origins
- `SPRING_PROFILES_ACTIVE`: Set to 'prod' for production

### Database
The application uses MySQL 8.0. In production:
1. Use a managed database service (e.g., AWS RDS)
2. Configure regular backups
3. Use connection pooling
4. Monitor performance

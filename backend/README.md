# Backend - Spring Boot Application

This is the backend service for the Logistick project, built with Spring Boot.

## 🏗️ Architecture

- **Framework**: Spring Boot 3.5.5
- **Database**: PostgreSQL
- **Language**: Java 17
- **Build Tool**: Maven

## 📁 Folder Structure

```
src/
├── main/
│   ├── java/com/project/logistick/
│   │   ├── LogistickApplication.java      # Main application class
│   │   ├── Controller/                    # REST API Controllers
│   │   │   ├── Admin_Controller.java
│   │   │   └── User_Controller.java
│   │   ├── DAO/                           # Data Access Objects
│   │   ├── DTO/                           # Data Transfer Objects
│   │   ├── Entities/                      # JPA Entity classes
│   │   ├── Exceptions/                    # Custom exceptions
│   │   ├── Repositories/                  # Spring Data JPA repositories
│   │   └── Services/                      # Business logic services
│   └── resources/
│       ├── application.properties         # Database & app configuration
│       ├── static/                        # Static assets (CSS, JS)
│       └── templates/                     # HTML templates
└── test/
    └── java/                              # Unit tests
```

## 🔌 API Endpoints

### Admin APIs
- Base path: `/admin/**`
- Endpoints defined in `Controller/Admin_Controller.java`

### User APIs
- Base path: `/user/**`
- Endpoints defined in `Controller/User_Controller.java`

## 🗄️ Database Configuration

Update `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/logstickproject
spring.datasource.username=postgres
spring.datasource.password=root
```

### Database Tables
Auto-generated from entity classes (JPA):
- Address
- Cargo
- Carrier
- Driver
- Loading
- Order
- Truck
- Unloading

## 🏃 Running the Application

### Using Maven Wrapper
```bash
./mvnw spring-boot:run
```

### Using Maven (if installed)
```bash
mvn spring-boot:run
```

### Build JAR
```bash
./mvnw clean package
```

The JAR will be in `target/logistick-0.0.1-SNAPSHOT.jar`

### Run JAR
```bash
java -jar target/logistick-0.0.1-SNAPSHOT.jar
```

## 🌐 Server Configuration

- **Default Port**: 8080
- **Context Path**: / (root)
- **Access**: `http://localhost:8080`

## 🔐 CORS Configuration

CORS is configured in `LogistickApplication.java` for cross-origin requests.

## 📦 Dependencies

Main dependencies (see `pom.xml`):
- Spring Boot Starter Web
- Spring Boot Starter Data JPA
- Spring Boot Starter Validation
- PostgreSQL Driver
- Hibernate

## 🧪 Testing

Run tests with:
```bash
./mvnw test
```

## 📝 Notes

- The backend automatically serves frontend files from the `../frontend/` folder
- All HTML, CSS, and JS files are served as static content
- Database must be running before starting the application
- JPA auto-creates/updates database tables based on entity classes

---

For the complete project overview, see [../README.md](../README.md)

# Logistick Project - Restructured

This project has been reorganized into **Frontend** and **Backend** folders for better separation of concerns.

## 📁 Project Structure

```
logistick/
├── backend/          # Spring Boot Backend Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/        # Java source code
│   │   │   └── resources/   # Configuration files
│   │   └── test/            # Unit tests
│   ├── pom.xml             # Maven configuration
│   ├── mvnw                # Maven wrapper
│   └── mvnw.cmd
│
├── frontend/        # Frontend Files (HTML, CSS, JavaScript)
│   ├── static/     # CSS, JS, and other static assets
│   └── templates/  # HTML templates
│
└── logistick/      # Original project (can be archived/removed)
```

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Maven (or use the included `mvnw`)
- PostgreSQL database running on localhost:5432

### Build and Run

**1. Build the Backend:**
```bash
cd backend
./mvnw clean package
```

**2. Run the Backend:**
```bash
cd backend
./mvnw spring-boot:run
```

The application will start on `http://localhost:8080`

### Frontend Access

The frontend files are automatically served by the Spring Boot backend from the parent `frontend/` folder:
- Static assets (CSS, JS): `/static/**`
- HTML templates: `/*.html`

You can access the application at:
- **Admin Dashboard**: `http://localhost:8080/admin-dashboard.html`
- **Customer Dashboard**: `http://localhost:8080/customer-dashboard.html`
- **Login**: `http://localhost:8080/login.html`

## 📝 Database Configuration

Update the database credentials in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## 🔧 Development

- **Backend Development**: Make changes in the `backend/src/main/java` folder
- **Frontend Development**: Make changes in the `frontend/static` or `frontend/templates` folders
- **Styling**: Edit CSS files in `frontend/static/`
- **JavaScript**: Edit JS files in `frontend/static/`

## 📦 Deployment

When deploying:
1. Build the backend: `./mvnw clean package`
2. The JAR file will be created in `backend/target/`
3. Ensure the `frontend/` folder is in the same directory as the running JAR file

## ✅ Features

- ✅ Separated frontend and backend code
- ✅ Automatic static file serving from frontend folder
- ✅ Spring Boot WebMvcConfigurer for resource mapping
- ✅ Full functionality maintained
- ✅ Easy to develop and deploy

## 📚 Notes

- The backend is configured to serve static files from the `../frontend/` directory
- No logic has been changed - only the folder structure has been reorganized
- The application will work the same as before

---

For more information, see the README files in the `backend/` and `frontend/` folders.

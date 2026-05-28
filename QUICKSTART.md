# 🚀 Quick Start Guide

## Project Reorganization Complete! ✅

Your Logistick project has been successfully reorganized into **Frontend** and **Backend** folders while maintaining 100% functionality.

---

## 📂 New Project Structure

```
logistick/
├── backend/              ← All Java/Spring Boot code
├── frontend/             ← All HTML/CSS/JavaScript files
├── logistick/            ← Original project (can archive)
├── README.md             ← Project overview
├── QUICKSTART.md         ← This file
├── build.bat             ← Windows build script
├── build.ps1             ← PowerShell build script
└── HELP.md               ← Original help file
```

---

## ⚡ Getting Started (3 Steps)

### Step 1: Navigate to Backend
```bash
cd backend
```

### Step 2: Run the Application
```bash
./mvnw spring-boot:run
```

### Step 3: Open in Browser
Visit: **http://localhost:8080/login.html**

---

## 🎯 What Was Changed?

### ✅ Created
- `frontend/` folder with all HTML, CSS, JavaScript files
- `backend/` folder with all Java source code and dependencies
- `Config/WebConfig.java` - Serves frontend files from parent directory
- Build scripts (`build.bat` and `build.ps1`)
- Documentation (README files)

### ✅ Maintained
- ✅ All Java source code (unchanged)
- ✅ All business logic (unchanged)
- ✅ All database connections (unchanged)
- ✅ All API endpoints (unchanged)
- ✅ All frontend functionality (unchanged)

### ✅ No Breaking Changes
- Application works exactly as before
- All features intact
- Database connectivity preserved
- API endpoints unchanged

---

## 🛠️ Build Commands

### Quick Build & Run
```bash
# Windows (batch)
build.bat

# Or run with Maven directly
cd backend
./mvnw spring-boot:run
```

### Build Only (Create JAR)
```bash
cd backend
./mvnw clean package
```

### Run Tests
```bash
cd backend
./mvnw test
```

### Clean Build
```bash
cd backend
./mvnw clean
```

---

## 🌐 Access Points

Once the application is running on `http://localhost:8080`:

| Page | URL |
|------|-----|
| Login | http://localhost:8080/login.html |
| Admin Dashboard | http://localhost:8080/admin-dashboard.html |
| Customer Dashboard | http://localhost:8080/customer-dashboard.html |

---

## 📝 Database Configuration

Before running, ensure PostgreSQL is configured:

Edit: `backend/src/main/resources/application.properties`

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/logstickproject
spring.datasource.username=postgres
spring.datasource.password=root
```

---

## 📁 File Organization

### Backend Structure
```
backend/
├── src/main/java/com/project/logistick/
│   ├── LogistickApplication.java
│   ├── Config/
│   │   └── WebConfig.java (NEW - serves frontend files)
│   ├── Controller/
│   ├── Services/
│   ├── Repositories/
│   ├── Entities/
│   ├── DTO/
│   ├── Exceptions/
│   └── ...
├── pom.xml
├── mvnw
└── README.md
```

### Frontend Structure
```
frontend/
├── static/
│   ├── admin-dashboard.html
│   ├── admin-dashboard.css
│   ├── admin-dashboard.js
│   ├── customer-dashboard.html
│   └── login.html
├── templates/
│   └── login.html
└── README.md
```

---

## 🔧 Advanced Usage

### Deploy the Application

1. **Build JAR file:**
   ```bash
   cd backend
   ./mvnw clean package
   ```

2. **JAR location:** `backend/target/logistick-0.0.1-SNAPSHOT.jar`

3. **Run JAR:**
   ```bash
   java -jar backend/target/logistick-0.0.1-SNAPSHOT.jar
   ```

### Development Workflow

1. **Backend Changes:**
   - Edit Java files in `backend/src/main/java/`
   - Rebuild with `./mvnw clean package`
   - Restart application

2. **Frontend Changes:**
   - Edit files in `frontend/static/` or `frontend/templates/`
   - Refresh browser (no rebuild needed!)
   - Changes served automatically

---

## ✨ Key Features

✅ **Separated Concerns** - Frontend and backend in separate folders
✅ **Easy to Maintain** - Clear directory structure
✅ **Hot Reload** - Frontend changes without rebuild
✅ **Production Ready** - Standard Spring Boot structure
✅ **Version Control** - Separate folder organization
✅ **Scalable** - Easy to add more frontend/backend modules

---

## 📚 For More Information

- **Project Overview**: See [README.md](README.md)
- **Backend Details**: See [backend/README.md](backend/README.md)
- **Frontend Details**: See [frontend/README.md](frontend/README.md)
- **Original Help**: See [HELP.md](HELP.md)

---

## ❓ Troubleshooting

### Application won't start?
- Check if PostgreSQL is running
- Verify database credentials in `application.properties`
- Check if port 8080 is available

### Frontend files not loading?
- Verify files exist in `frontend/` folder
- Clear browser cache
- Restart the application

### Build fails?
- Ensure Java 17+ is installed: `java -version`
- Check Maven is working: `./mvnw -version`
- Delete `backend/target` and rebuild: `./mvnw clean package`

---

## 🎉 You're All Set!

Your project is now properly organized with separated frontend and backend folders. Start the backend and enjoy developing! 

```bash
cd backend && ./mvnw spring-boot:run
```

Happy coding! 🚀

---

**Date Modified**: 2026-05-27
**Structure Version**: 1.0

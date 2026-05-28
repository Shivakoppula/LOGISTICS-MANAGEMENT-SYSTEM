═══════════════════════════════════════════════════════════════════════════════
                           QUICK REFERENCE GUIDE
                    All Common Commands & Processes at a Glance
═══════════════════════════════════════════════════════════════════════════════

█████████████████████████████████████████████████████████████████████████████
EVERYDAY TASKS
█████████████████████████████████████████████████████████████████████████████

┌─────────────────────────────────────────────────────────────────────────────
│ TASK: Run the application locally
├─────────────────────────────────────────────────────────────────────────────

Command:
   cd "c:\Users\SHIVA KOPPULA\Downloads\logistick\backend"
   $env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
   ./mvnw spring-boot:run

Open Browser:
   http://localhost:8080/login.html

Stop Application:
   Press: CTRL + C in PowerShell

└─────────────────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────────
│ TASK: Edit frontend and sync changes
├─────────────────────────────────────────────────────────────────────────────

Step 1: Edit your files
   Location: c:\Users\SHIVA KOPPULA\Downloads\logistick\frontend\static\
   Files: login.html, admin-dashboard.html, admin-dashboard.css, admin-dashboard.js

Step 2: Run sync script
   Option A (Command line):
      cd "c:\Users\SHIVA KOPPULA\Downloads\logistick"
      .\sync.ps1

   Option B (Easy - Double-click):
      File Explorer → logistick folder → Double-click sync.bat

Step 3: Refresh browser
   Press: F5 (or CTRL + R) in browser

✅ Changes appear automatically (due to LiveReload)

└─────────────────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────────
│ TASK: Check if port 8080 is in use
├─────────────────────────────────────────────────────────────────────────────

Command:
   Get-NetTCPConnection -LocalPort 8080 | Select OwningProcess

If something is using it, kill the process:
   Stop-Process -Id [PID] -Force

(Replace [PID] with number shown)

└─────────────────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────────
│ TASK: Check if database is connected
├─────────────────────────────────────────────────────────────────────────────

Look for this in application logs:
   "HikariPool-1 - Added connection"
   "Hibernate: select nextval"

If you see these: ✅ Database is working

If you see errors:
   - Check PostgreSQL is running
   - Check credentials in application.properties
   - Check database exists

└─────────────────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────────
│ TASK: View application logs
├─────────────────────────────────────────────────────────────────────────────

Logs automatically show in PowerShell terminal where you ran the app.

Useful information to look for:
   ✅ "Tomcat started on port 8080" = Server running
   ✅ "HikariPool-1 - Added connection" = Database connected
   ✅ "ERROR" = Something broke
   ✅ "WARN" = Warning (usually not critical)

└─────────────────────────────────────────────────────────────────────────────

█████████████████████████████████████████████████████████████████████████████
GIT COMMANDS (For GitHub)
█████████████████████████████████████████████████████████████████████████████

┌─────────────────────────────────────────────────────────────────────────────
│ TASK: Save your changes to GitHub
├─────────────────────────────────────────────────────────────────────────────

Step 1: Check what files changed
   git status

Step 2: Add all files to commit
   git add .

Step 3: Create a checkpoint (commit) with message
   git commit -m "Fixed login page styling"
   
   Message tips:
   ✅ Clear: "Fixed login button color"
   ✅ Specific: "Added password validation to customer signup"
   ❌ Bad: "Updated stuff"
   ❌ Bad: "Changes"

Step 4: Upload to GitHub
   git push

Done! Changes are on GitHub.

└─────────────────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────────
│ TASK: Pull latest changes from GitHub
├─────────────────────────────────────────────────────────────────────────────

If someone else made changes on GitHub:
   
   git pull

This downloads latest changes to your computer.

└─────────────────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────────
│ TASK: View recent commits
├─────────────────────────────────────────────────────────────────────────────

Command:
   git log --oneline -10

Shows:
   [hash] Commit message
   
Example:
   abc1234 Fixed login page styling
   def5678 Added password validation
   ghi9012 Initial commit

└─────────────────────────────────────────────────────────────────────────────

█████████████████████████████████████████████████████████████████████████████
DEPLOYMENT COMMANDS
█████████████████████████████████████████████████████████████████████████████

┌─────────────────────────────────────────────────────────────────────────────
│ TASK: Build project into JAR file (for deployment)
├─────────────────────────────────────────────────────────────────────────────

Step 1: Go to backend folder
   cd "c:\Users\SHIVA KOPPULA\Downloads\logistick\backend"

Step 2: Build project
   ./mvnw clean package

This creates:
   target/logistick-0.0.1-SNAPSHOT.jar

This JAR file contains entire application (Java code + static files).

└─────────────────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────────
│ TASK: Run the JAR file (production mode)
├─────────────────────────────────────────────────────────────────────────────

Command:
   java -jar target/logistick-0.0.1-SNAPSHOT.jar

This starts the application in production mode.

Access at:
   http://localhost:8080/login.html

└─────────────────────────────────────────────────────────────────────────────

█████████████████████████████████████████████████████████████████████████████
FILE STRUCTURE REFERENCE
█████████████████████████████████████████████████████████████████████████████

logistick/
├── frontend/                              (Development files)
│   └── static/
│       ├── login.html                    (Edit here for UI changes)
│       ├── admin-dashboard.html
│       ├── admin-dashboard.css
│       ├── admin-dashboard.js
│       └── customer-dashboard.html
│
├── backend/                               (Production application)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/                     (Edit here for backend logic)
│   │   │   │   └── com/project/logistick/
│   │   │   │       ├── Controller/
│   │   │   │       ├── Services/
│   │   │   │       ├── Repositories/
│   │   │   │       └── Entitiesclasses/
│   │   │   └── resources/
│   │   │       ├── application.properties (Database settings)
│   │   │       └── static/               (Deployed frontend files)
│   │   └── test/                         (Test files)
│   ├── pom.xml                          (Dependencies)
│   ├── mvnw                             (Build tool for Linux/Mac)
│   └── mvnw.cmd                         (Build tool for Windows)
│
├── sync.ps1                              (Sync script - run this!)
├── sync.bat                              (Batch wrapper - double-click this!)
├── README_SYNC.md                        (Sync instructions)
└── README_DEPLOYMENT.md                  (Deployment instructions)

█████████████████████████████████████████████████████████████████████████████
COMMON ERRORS & FIXES
█████████████████████████████████████████████████████████████████████████████

┌─────────────────────────────────────────────────────────────────────────────
│ ERROR: "Port 8080 was already in use"
├─────────────────────────────────────────────────────────────────────────────

Cause: Another application is using port 8080

Fix:
   Get-NetTCPConnection -LocalPort 8080 | Select OwningProcess
   Stop-Process -Id [PID] -Force

Then try running app again.

└─────────────────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────────
│ ERROR: "JAVA_HOME is not defined"
├─────────────────────────────────────────────────────────────────────────────

Cause: Java environment not set up

Fix:
   $env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
   $env:Path = "$env:JAVA_HOME\bin;" + $env:Path
   java -version

Then try running app again.

└─────────────────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────────
│ ERROR: "Cannot connect to database"
├─────────────────────────────────────────────────────────────────────────────

Cause: PostgreSQL not running or credentials wrong

Fix:
   1. Check PostgreSQL is running:
      pg_isready -h localhost

   2. Check credentials in:
      backend/src/main/resources/application.properties

   3. Verify these match your PostgreSQL setup:
      spring.datasource.url=jdbc:postgresql://localhost:5432/logstickproject
      spring.datasource.username=postgres
      spring.datasource.password=root

└─────────────────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────────
│ ERROR: "Frontend files not loading in browser"
├─────────────────────────────────────────────────────────────────────────────

Cause: Forgot to run sync.ps1

Fix:
   cd "c:\Users\SHIVA KOPPULA\Downloads\logistick"
   .\sync.ps1

Then refresh browser.

└─────────────────────────────────────────────────────────────────────────────

█████████████████████████████████████████████████████████████████████████████
IMPORTANT NOTES
█████████████████████████████████████████████████████████████████████████████

⚠️ ALWAYS RUN sync.ps1 BEFORE:
   - Refreshing browser (if you edited files)
   - Pushing to GitHub
   - Deploying to server

⚠️ BEFORE DEPLOYMENT:
   - Test everything locally first
   - Create database backup
   - Change all default passwords
   - Enable HTTPS/SSL
   - Never commit sensitive passwords

⚠️ AFTER DEPLOYMENT:
   - Monitor logs regularly
   - Backup database regularly
   - Keep GitHub repo updated
   - Test all functionality again

═══════════════════════════════════════════════════════════════════════════════

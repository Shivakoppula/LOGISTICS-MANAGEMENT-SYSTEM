@echo off
REM Build and Run Script for Logistick Project

cd /d "%~dp0"

echo.
echo ========================================
echo   Logistick Project - Build & Run
echo ========================================
echo.

:menu
echo.
echo Select an option:
echo 1. Build Backend (Maven)
echo 2. Run Backend (Spring Boot)
echo 3. Build and Run Backend
echo 4. Run Tests
echo 5. Clean Build
echo 6. Exit
echo.

set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto build
if "%choice%"=="2" goto run
if "%choice%"=="3" goto buildrun
if "%choice%"=="4" goto test
if "%choice%"=="5" goto clean
if "%choice%"=="6" goto exit
echo Invalid choice. Please try again.
goto menu

:build
echo.
echo Building backend...
cd backend
call mvnw clean package
if %ERRORLEVEL% EQU 0 (
    echo.
    echo Build successful!
    echo JAR file: target\logistick-0.0.1-SNAPSHOT.jar
) else (
    echo Build failed!
)
cd ..
goto menu

:run
echo.
echo Starting Spring Boot application...
echo.
echo Application will be available at: http://localhost:8080
echo.
cd backend
call mvnw spring-boot:run
cd ..
goto menu

:buildrun
echo.
echo Building and running backend...
cd backend
call mvnw clean package
if %ERRORLEVEL% EQU 0 (
    echo.
    echo Build successful! Starting application...
    echo.
    echo Application will be available at: http://localhost:8080
    echo.
    java -jar target\logistick-0.0.1-SNAPSHOT.jar
) else (
    echo Build failed!
)
cd ..
goto menu

:test
echo.
echo Running tests...
cd backend
call mvnw test
cd ..
goto menu

:clean
echo.
echo Cleaning build artifacts...
cd backend
call mvnw clean
echo Clean complete!
cd ..
goto menu

:exit
echo.
echo Exiting...
exit /b 0

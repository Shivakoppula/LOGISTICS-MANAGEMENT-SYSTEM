#!/usr/bin/env pwsh
# Build and Run Script for Logistick Project

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

function Show-Menu {
    Write-Host ""
    Write-Host "========================================"
    Write-Host "  Logistick Project - Build & Run"
    Write-Host "========================================"
    Write-Host ""
    Write-Host "1. Build Backend (Maven)"
    Write-Host "2. Run Backend (Spring Boot)"
    Write-Host "3. Build and Run Backend"
    Write-Host "4. Run Tests"
    Write-Host "5. Clean Build"
    Write-Host "6. Exit"
    Write-Host ""
}

function Build-Backend {
    Write-Host ""
    Write-Host "Building backend..."
    Push-Location backend
    & ./mvnw clean package
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "Build successful!"
        Write-Host "JAR file: target\logistick-0.0.1-SNAPSHOT.jar"
    } else {
        Write-Host "Build failed!"
    }
    Pop-Location
}

function Run-Backend {
    Write-Host ""
    Write-Host "Starting Spring Boot application..."
    Write-Host ""
    Write-Host "Application will be available at: http://localhost:8080"
    Write-Host ""
    Push-Location backend
    & ./mvnw spring-boot:run
    Pop-Location
}

function BuildAndRun-Backend {
    Write-Host ""
    Write-Host "Building and running backend..."
    Push-Location backend
    & ./mvnw clean package
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "Build successful! Starting application..."
        Write-Host ""
        Write-Host "Application will be available at: http://localhost:8080"
        Write-Host ""
        & java -jar target\logistick-0.0.1-SNAPSHOT.jar
    } else {
        Write-Host "Build failed!"
    }
    Pop-Location
}

function Run-Tests {
    Write-Host ""
    Write-Host "Running tests..."
    Push-Location backend
    & ./mvnw test
    Pop-Location
}

function Clean-Build {
    Write-Host ""
    Write-Host "Cleaning build artifacts..."
    Push-Location backend
    & ./mvnw clean
    Write-Host "Clean complete!"
    Pop-Location
}

# Main loop
while ($true) {
    Show-Menu
    $choice = Read-Host "Enter your choice (1-6)"
    
    switch ($choice) {
        "1" { Build-Backend }
        "2" { Run-Backend; break }
        "3" { BuildAndRun-Backend; break }
        "4" { Run-Tests }
        "5" { Clean-Build }
        "6" { Write-Host ""; Write-Host "Exiting..."; break }
        default { Write-Host "Invalid choice. Please try again." }
    }
}

# Backend Startup Script
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.6.10-hotspot"

Write-Host "Starting Spring Boot Backend..." -ForegroundColor Green
Write-Host "JAVA_HOME: $env:JAVA_HOME" -ForegroundColor Yellow
Write-Host ""
Write-Host "Make sure MySQL is running and the database 'ecommerce_db' exists!" -ForegroundColor Yellow
Write-Host "Database credentials in application.properties:" -ForegroundColor Yellow
Write-Host "  Username: root" -ForegroundColor Yellow
Write-Host "  Password: root" -ForegroundColor Yellow
Write-Host ""

.\mvnw.cmd spring-boot:run


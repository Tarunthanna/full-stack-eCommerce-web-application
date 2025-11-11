# How to Start the Application

## Prerequisites
1. **MySQL must be running** on port 3306
2. **Database must exist** - Run the schema file:
   ```bash
   mysql -u root -p < database/schema.sql
   ```
   Or create it manually:
   ```sql
   CREATE DATABASE ecommerce_db;
   ```

3. **Update database credentials** in `backend/src/main/resources/application.properties` if needed:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

## Starting the Backend

### Option 1: Using PowerShell Script
```powershell
cd backend
.\start-backend.ps1
```

### Option 2: Using Maven Wrapper
```powershell
cd backend
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.6.10-hotspot"
.\mvnw.cmd spring-boot:run
```

### Option 3: Using JAR File
```powershell
cd backend
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.6.10-hotspot"
java -jar target\ecommerce-backend-1.0.0.jar
```

The backend will start on **http://localhost:8080**

## Starting the Frontend

```powershell
cd frontend
npm start
```

The frontend will start on **http://localhost:3000**

## Troubleshooting

### Backend won't start:
1. Check if MySQL is running: `netstat -ano | findstr ":3306"`
2. Verify database exists: Connect to MySQL and check for `ecommerce_db`
3. Check database credentials in `application.properties`
4. Check if port 8080 is available: `netstat -ano | findstr ":8080"`
5. Check Java version: `java -version` (should be 17 or higher)

### Frontend won't start:
1. Make sure dependencies are installed: `npm install`
2. Check if port 3000 is available: `netstat -ano | findstr ":3000"`
3. Check Node.js version: `node --version` (should be 16 or higher)

### Connection Refused Error:
- Make sure both backend and frontend are running
- Backend should be on port 8080
- Frontend should be on port 3000
- Check firewall settings


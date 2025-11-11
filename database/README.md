# Database Setup

## Prerequisites
- MySQL Server installed and running
- MySQL user with appropriate privileges

## Setup Instructions

1. **Create Database and Tables**
   - Option 1: Run the schema.sql file:
     ```bash
     mysql -u root -p < schema.sql
     ```
   - Option 2: Execute the SQL commands manually in MySQL Workbench or command line

2. **Update Database Credentials**
   - Update `backend/src/main/resources/application.properties` with your MySQL credentials:
     ```properties
     spring.datasource.username=your_username
     spring.datasource.password=your_password
     ```

3. **Default Admin Account**
   - Email: admin@example.com
   - Password: admin123
   - Note: You can register a new admin account or update the existing one

## Database Schema

The database includes the following tables:
- `users` - User accounts with role-based access
- `products` - Product catalog
- `cart` - Shopping cart items
- `orders` - Order information
- `order_items` - Individual items in each order


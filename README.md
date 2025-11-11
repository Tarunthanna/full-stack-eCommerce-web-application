# Full-Stack ECommerce Web Application

A complete eCommerce web application built with React frontend and Spring Boot backend, featuring user authentication, product management, shopping cart, order processing, and admin dashboard.

## 🚀 Technologies Used

### Frontend
- **React 18+** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client for API calls
- **HTML/CSS** - Styling

### Backend
- **Java 17+** - Programming language
- **Spring Boot 3.x** - Framework
- **Spring Data JPA** - Data persistence
- **Hibernate** - ORM
- **MySQL** - Database
- **BCrypt** - Password encryption

## 📋 Features

### User Module
- ✅ User registration with password encryption
- ✅ User login/logout
- ✅ View and update user profile
- ✅ Role-based access control (Admin/User)

### Product Module
- ✅ Admin can add, update, and delete products
- ✅ Users can view all products
- ✅ Product details page with image, name, price, category, and description
- ✅ Category filtering

### Cart Module
- ✅ Add/remove products from cart
- ✅ Update product quantities
- ✅ Dynamic total price calculation

### Order Module
- ✅ Place orders from cart
- ✅ Order confirmation
- ✅ Order history for users
- ✅ Order management for admins

### Admin Dashboard
- ✅ Manage users (view, delete)
- ✅ Manage products (CRUD operations)
- ✅ View all orders
- ✅ Update order status

### Payment Simulation
- ✅ Dummy payment gateway simulation for checkout

## 🛠️ Setup Instructions

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Node.js 16+ and npm
- MySQL 8.0+
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Configure Database**
   - Create MySQL database:
     ```sql
     CREATE DATABASE ecommerce_db;
     ```
   - Or run the schema file:
     ```bash
     mysql -u root -p < ../database/schema.sql
     ```

3. **Update Database Credentials**
   - Edit `src/main/resources/application.properties`
   - Update MySQL username and password:
     ```properties
     spring.datasource.username=root
     spring.datasource.password=your_password
     ```

4. **Build and Run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   - Backend will run on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Add Product Images**
   - Place your product images in `frontend/public/images/` folder:
     - `laptop-dell-xps.jpg` - Dell XPS laptops
     - `smartphone-purple.jpg` - Purple smartphones (Apple)
     - `speakers-philips.jpg` - Philips multimedia speakers
     - `watch-luxury.jpg` - Luxury wristwatch
     - `coat-dark-grey.jpg` - Dark grey coat
     - `bike-mountain.jpg` - Mountain bike
   - See `frontend/public/images/README.md` for details

4. **Start Development Server**
   ```bash
   npm start
   ```
   - Frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
full-stack eCommerce web application/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/ecommerce/
│   │   │   │   ├── config/          # Configuration classes
│   │   │   │   ├── controller/       # REST controllers
│   │   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── entity/           # JPA entities
│   │   │   │   ├── repository/       # JPA repositories
│   │   │   │   ├── service/          # Business logic
│   │   │   │   └── EcommerceApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
├── frontend/
│   ├── public/
│   │   ├── images/          # Product images folder
│   │   └── index.html
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── utils/           # Utility functions
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── database/
│   └── schema.sql          # Database schema
└── README.md
```

## 🖼️ Product Images

The application includes support for product images. Place your images in `frontend/public/images/` with the following filenames:

1. `laptop-dell-xps.jpg` - Dell XPS laptops
2. `smartphone-purple.jpg` - Purple smartphones (Apple)
3. `speakers-philips.jpg` - Philips multimedia speakers
4. `watch-luxury.jpg` - Luxury wristwatch (Ulysse Nardin)
5. `coat-dark-grey.jpg` - Dark grey coat
6. `bike-mountain.jpg` - Mountain bike (AHOY! BIKES)

Images are referenced in the database schema and will be displayed on product pages. If images are not found, placeholder images will be shown.

## 🔑 Default Admin Account

- **Email:** admin@example.com
- **Password:** admin123

*Note: You can register a new account or update the admin password after first login.*

## 📡 API Endpoints

### User APIs
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `GET /api/users/all` - Get all users (Admin)
- `DELETE /api/users/{id}` - Delete user (Admin)

### Product APIs
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Get products by category
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/{id}` - Update product (Admin)
- `DELETE /api/products/{id}` - Delete product (Admin)

### Cart APIs
- `GET /api/cart/{userId}` - Get user's cart
- `POST /api/cart/add` - Add product to cart
- `PUT /api/cart/{cartId}` - Update cart item
- `DELETE /api/cart/{cartId}` - Remove from cart
- `DELETE /api/cart/clear/{userId}` - Clear cart

### Order APIs
- `POST /api/orders/place/{userId}` - Place order
- `GET /api/orders/user/{userId}` - Get user's orders
- `GET /api/orders/{orderId}` - Get order by ID
- `GET /api/orders/all` - Get all orders (Admin)
- `PUT /api/orders/{orderId}/status` - Update order status (Admin)

### Payment APIs
- `POST /api/payment/simulate` - Simulate payment

## 🎨 Frontend Pages

- **Home** (`/`) - Landing page with featured products
- **Login** (`/login`) - User login
- **Register** (`/register`) - User registration
- **Products** (`/products`) - Product listing
- **Product Details** (`/products/:id`) - Product details page
- **Cart** (`/cart`) - Shopping cart
- **Checkout** (`/checkout`) - Checkout and payment
- **Order History** (`/orders`) - User's order history
- **Order Confirmation** (`/orders/:orderId`) - Order confirmation page
- **Admin Dashboard** (`/admin`) - Admin management panel

## 🔒 Security Features

- Password encryption using BCrypt
- Role-based access control
- CORS configuration for frontend-backend communication
- Input validation on both frontend and backend

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📝 Notes

- The application uses localStorage for session management
- JWT token authentication can be added for enhanced security
- Payment gateway is simulated for demonstration purposes
- Database schema is auto-created by Hibernate on first run (if `spring.jpa.hibernate.ddl-auto=update`)
- Product images should be placed in `frontend/public/images/` folder

## 🐛 Troubleshooting

### Backend Issues
- Ensure MySQL is running and database exists
- Check database credentials in `application.properties`
- Verify Java version is 17 or higher
- Check port 8080 is not in use

### Frontend Issues
- Ensure backend is running on port 8080
- Check CORS configuration if API calls fail
- Clear browser cache and localStorage if session issues occur
- Verify Node.js version is 16 or higher
- Ensure product images are placed in `frontend/public/images/` folder

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Development

For development:
1. Backend: Use Spring Boot DevTools for hot reload
2. Frontend: React development server with hot reload enabled
3. Database: Use MySQL Workbench or command line for database management

## 🚀 Deployment

### Backend Deployment
- Build JAR: `mvn clean package`
- Run JAR: `java -jar target/ecommerce-backend-1.0.0.jar`
- Configure production database credentials

### Frontend Deployment
- Build: `npm run build`
- Deploy `build` folder to static hosting (Netlify, Vercel, etc.)
- Update API base URL in `src/services/api.js` for production

---

**Happy Coding! 🎉**

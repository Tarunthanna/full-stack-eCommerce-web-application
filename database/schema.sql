-- ECommerce Database Schema
-- Database: ecommerce_db

CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Cart Table
CREATE TABLE IF NOT EXISTS cart (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id)
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insert Sample Admin User (password: admin123)
-- Password is bcrypt hash of "admin123"
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iwK8pJ5C', 'ADMIN')
ON DUPLICATE KEY UPDATE name=name;

-- Insert Sample Products
INSERT INTO products (name, description, price, category, image_url) VALUES
('Dell XPS Laptop', 'High-performance Dell XPS laptop with latest processor, vibrant display, and sleek design. Perfect for professionals and creatives.', 1299.99, 'Electronics', '/images/laptop-dell-xps.jpg'),
('Apple iPhone (Purple)', 'Latest Apple smartphone with advanced features, Dynamic Island, and stunning purple finish. Premium quality and performance.', 999.99, 'Electronics', '/images/smartphone-purple.jpg'),
('Philips Multimedia Speakers', 'Premium black multimedia speakers with dual drivers, tweeter and woofer design. Perfect for desktop audio setup.', 149.99, 'Electronics', '/images/speakers-philips.jpg'),
('Luxury Wristwatch', 'Elegant luxury wristwatch with rose gold case, Roman numeral dial, and alligator leather strap. Timeless sophistication.', 2499.99, 'Accessories', '/images/watch-luxury.jpg'),
('Dark Grey Coat', 'Stylish dark grey wool coat with wide draped collar and double-breasted closure. Perfect for cooler weather with elegant silhouette.', 299.99, 'Clothing', '/images/coat-dark-grey.jpg'),
('Mountain Bike', 'Modern mountain bike with black frame and orange accents. Front suspension, disc brakes, and knobby tires for off-road adventures.', 799.99, 'Sports', '/images/bike-mountain.jpg'),
('T-Shirt', 'Comfortable cotton t-shirt', 29.99, 'Clothing', 'https://via.placeholder.com/300'),
('Jeans', 'Classic blue jeans', 59.99, 'Clothing', 'https://via.placeholder.com/300'),
('Sneakers', 'Comfortable running sneakers', 89.99, 'Footwear', 'https://via.placeholder.com/300'),
('Backpack', 'Durable travel backpack', 79.99, 'Accessories', 'https://via.placeholder.com/300')
ON DUPLICATE KEY UPDATE name=name;


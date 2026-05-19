package com.ecommerce.config;

import com.ecommerce.entity.Product;
import com.ecommerce.entity.User;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final String ADMIN_EMAIL = "admin@example.com";
    private static final String ADMIN_PASSWORD = "admin123";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedAdmin();
        seedProducts();
        fixProductImages();
    }

    private void seedAdmin() {
        userRepository.findByEmail(ADMIN_EMAIL).ifPresentOrElse(
            user -> {
                if (!passwordEncoder.matches(ADMIN_PASSWORD, user.getPassword())) {
                    user.setPassword(passwordEncoder.encode(ADMIN_PASSWORD));
                    user.setRole(User.Role.ADMIN);
                    userRepository.save(user);
                }
            },
            () -> {
                User admin = new User();
                admin.setName("Admin User");
                admin.setEmail(ADMIN_EMAIL);
                admin.setPassword(passwordEncoder.encode(ADMIN_PASSWORD));
                admin.setRole(User.Role.ADMIN);
                userRepository.save(admin);
            }
        );
    }

    private void seedProducts() {
        if (productRepository.count() > 0) {
            return;
        }

        saveProduct("Dell XPS Laptop",
                "High-performance Dell XPS laptop with vibrant display and sleek design. Perfect for professionals.",
                "1299.99", "Electronics",
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80");
        saveProduct("Apple iPhone (Purple)",
                "Latest Apple smartphone with advanced features and stunning purple finish.",
                "999.99", "Electronics",
                "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80");
        saveProduct("Philips Multimedia Speakers",
                "Premium speakers with dual drivers. Perfect for desktop audio setup.",
                "149.99", "Electronics",
                "https://images.unsplash.com/photo-1545454675-3531b543be6d?w=800&q=80");
        saveProduct("Luxury Wristwatch",
                "Elegant wristwatch with rose gold case and leather strap. Timeless sophistication.",
                "2499.99", "Accessories",
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80");
        saveProduct("Dark Grey Coat",
                "Stylish wool coat with wide collar and double-breasted closure.",
                "299.99", "Clothing",
                "https://images.unsplash.com/photo-1539533018447-66fcce3288ad?w=800&q=80");
        saveProduct("Mountain Bike",
                "Modern mountain bike with front suspension and disc brakes for off-road adventures.",
                "799.99", "Sports",
                "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&q=80");
        saveProduct("Cotton T-Shirt",
                "Comfortable everyday cotton t-shirt in a relaxed fit.",
                "29.99", "Clothing",
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80");
        saveProduct("Classic Blue Jeans",
                "Classic blue denim jeans with a comfortable straight fit.",
                "59.99", "Clothing",
                "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80");
        saveProduct("Running Sneakers",
                "Lightweight running sneakers built for comfort and performance.",
                "89.99", "Footwear",
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80");
        saveProduct("Travel Backpack",
                "Durable travel backpack with padded straps and multiple compartments.",
                "79.99", "Accessories",
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80");
    }

    private void fixProductImages() {
        productRepository.findAll().forEach(product -> {
            String url = product.getImageUrl();
            if (url == null || url.contains("placeholder.com") || url.startsWith("/images/")) {
                product.setImageUrl(resolveImageUrl(product.getName(), product.getCategory()));
                productRepository.save(product);
            }
        });
    }

    private void saveProduct(String name, String description, String price, String category, String imageUrl) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(new BigDecimal(price));
        product.setCategory(category);
        product.setImageUrl(imageUrl);
        productRepository.save(product);
    }

    private String resolveImageUrl(String name, String category) {
        String lower = name == null ? "" : name.toLowerCase();
        if (lower.contains("laptop")) {
            return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80";
        }
        if (lower.contains("iphone") || lower.contains("phone")) {
            return "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80";
        }
        if (lower.contains("speaker")) {
            return "https://images.unsplash.com/photo-1545454675-3531b543be6d?w=800&q=80";
        }
        if (lower.contains("watch")) {
            return "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80";
        }
        if (lower.contains("coat")) {
            return "https://images.unsplash.com/photo-1539533018447-66fcce3288ad?w=800&q=80";
        }
        if (lower.contains("bike")) {
            return "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&q=80";
        }
        if (lower.contains("shirt") || lower.contains("t-shirt")) {
            return "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80";
        }
        if (lower.contains("jean")) {
            return "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80";
        }
        if (lower.contains("sneaker") || lower.contains("shoe")) {
            return "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80";
        }
        if (lower.contains("backpack")) {
            return "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80";
        }
        if ("Electronics".equals(category)) {
            return "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&q=80";
        }
        if ("Clothing".equals(category)) {
            return "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80";
        }
        if ("Sports".equals(category)) {
            return "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80";
        }
        return "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80";
    }
}

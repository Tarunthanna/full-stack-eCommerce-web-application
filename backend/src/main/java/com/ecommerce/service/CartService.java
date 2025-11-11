package com.ecommerce.service;

import com.ecommerce.dto.CartDTO;
import com.ecommerce.dto.CartResponseDTO;
import com.ecommerce.dto.ProductDTO;
import com.ecommerce.entity.Cart;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.User;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {
    
    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    public CartResponseDTO getCartByUserId(Long userId) {
        List<Cart> cartItems = cartRepository.findByUserId(userId);
        List<CartDTO> cartDTOs = cartItems.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        
        BigDecimal totalPrice = cartItems.stream()
                .map(item -> item.getProduct().getPrice()
                        .multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        return new CartResponseDTO(cartDTOs, totalPrice);
    }
    
    public CartDTO addToCart(Long userId, Long productId, Integer quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        Optional<Cart> existingCart = cartRepository.findByUserIdAndProductId(userId, productId);
        
        Cart cart;
        if (existingCart.isPresent()) {
            cart = existingCart.get();
            cart.setQuantity(cart.getQuantity() + quantity);
        } else {
            cart = new Cart();
            cart.setUser(user);
            cart.setProduct(product);
            cart.setQuantity(quantity);
        }
        
        Cart savedCart = cartRepository.save(cart);
        return convertToDTO(savedCart);
    }
    
    public CartDTO updateCartItem(Long cartId, Integer quantity) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        if (quantity <= 0) {
            cartRepository.delete(cart);
            return null;
        }
        
        cart.setQuantity(quantity);
        Cart updatedCart = cartRepository.save(cart);
        return convertToDTO(updatedCart);
    }
    
    @Transactional
    public void removeFromCart(Long cartId) {
        if (!cartRepository.existsById(cartId)) {
            throw new RuntimeException("Cart item not found");
        }
        cartRepository.deleteById(cartId);
    }
    
    @Transactional
    public void clearCart(Long userId) {
        cartRepository.deleteByUserId(userId);
    }
    
    private CartDTO convertToDTO(Cart cart) {
        CartDTO cartDTO = new CartDTO();
        cartDTO.setId(cart.getId());
        cartDTO.setUserId(cart.getUser().getId());
        
        ProductDTO productDTO = new ProductDTO(
                cart.getProduct().getId(),
                cart.getProduct().getName(),
                cart.getProduct().getDescription(),
                cart.getProduct().getPrice(),
                cart.getProduct().getCategory(),
                cart.getProduct().getImageUrl()
        );
        cartDTO.setProduct(productDTO);
        cartDTO.setQuantity(cart.getQuantity());
        
        return cartDTO;
    }
}


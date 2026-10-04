package com.app.order.controller;

import com.app.order.dto.OrderRequest;
import com.app.order.model.Order;
import com.app.order.service.OrderService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // =========================
    // Test API
    // =========================

    @GetMapping("/test")
    public ResponseEntity<String> test() {

        return ResponseEntity.ok(
                "Order Service is working!"
        );
    }


    // =========================
    // Create Order
    // =========================

    @PostMapping
    public ResponseEntity<Order> createOrder(
            @Valid @RequestBody OrderRequest request,
            Authentication authentication) {

        String username =
                authentication.getName();

        Order order =
                orderService.createOrder(
                        request,
                        username
                );

        return ResponseEntity.ok(order);
    }


    // =========================
    // Get All Orders
    // =========================

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {

        return ResponseEntity.ok(
                orderService.getAllOrders()
        );
    }


    // =========================
    // Get My Orders
    // =========================

    @GetMapping("/my-orders")
    public ResponseEntity<List<Order>> getMyOrders(
            Authentication authentication) {

        String username =
                authentication.getName();

        return ResponseEntity.ok(
                orderService.getOrdersByUser(username)
        );
    }


    // =========================
    // Get Order By ID
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                orderService.getOrderById(id)
        );
    }


    // =========================
    // Update Order
    // =========================

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(
            @PathVariable Long id,
            @Valid @RequestBody OrderRequest request) {

        return ResponseEntity.ok(
                orderService.updateOrder(
                        id,
                        request
                )
        );
    }


    // =========================
    // Delete Order
    // =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(
            @PathVariable Long id) {

        orderService.deleteOrder(id);

        return ResponseEntity.ok(
                "Order deleted successfully"
        );
    }
}
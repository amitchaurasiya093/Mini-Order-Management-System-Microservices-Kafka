package com.app.order.service;

import com.app.order.dto.OrderRequest;
import com.app.order.event.OrderCreatedEvent;
import com.app.order.kafka.OrderKafkaProducer;
import com.app.order.model.Order;
import com.app.order.repository.OrderRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderKafkaProducer kafkaProducer;

    public OrderService(
            OrderRepository orderRepository,
            OrderKafkaProducer kafkaProducer) {

        this.orderRepository = orderRepository;
        this.kafkaProducer = kafkaProducer;
    }

    public Order createOrder(
            OrderRequest request,
            String username) {

        Order order = new Order();

        order.setProductName(request.getProductName());
        order.setQuantity(request.getQuantity());
        order.setPrice(request.getPrice());
        order.setUsername(username);

        // Save order into MySQL
        Order savedOrder = orderRepository.save(order);

        // Create Kafka event
        OrderCreatedEvent event =
                new OrderCreatedEvent(
                        savedOrder.getId(),
                        savedOrder.getProductName(),
                        savedOrder.getQuantity(),
                        savedOrder.getPrice(),
                        savedOrder.getUsername()
                );

        // Send event to Kafka
        kafkaProducer.sendOrderCreatedEvent(event);

        return savedOrder;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByUser(String username) {
        return orderRepository.findByUsername(username);
    }

    public Order getOrderById(Long id) {

        return orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Order not found with id: " + id
                        )
                );
    }

    public Order updateOrder(
            Long id,
            OrderRequest request) {

        Order order = getOrderById(id);

        order.setProductName(request.getProductName());
        order.setQuantity(request.getQuantity());
        order.setPrice(request.getPrice());

        return orderRepository.save(order);
    }

    public void deleteOrder(Long id) {

        Order order = getOrderById(id);

        orderRepository.delete(order);
    }
}
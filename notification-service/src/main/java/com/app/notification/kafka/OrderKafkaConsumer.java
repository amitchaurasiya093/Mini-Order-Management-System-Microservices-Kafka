package com.app.notification.kafka;

import com.app.notification.event.OrderCreatedEvent;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class OrderKafkaConsumer {

    private final ObjectMapper objectMapper;


    public OrderKafkaConsumer(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }


    @KafkaListener(
            topics = "order-created",
            groupId = "notification-service-group"
    )
    public void consumeOrderCreatedEvent(String message) {

        try {

            OrderCreatedEvent event =
                    objectMapper.readValue(
                            message,
                            OrderCreatedEvent.class
                    );


            System.out.println();
            System.out.println("========================================");
            System.out.println("       NEW ORDER NOTIFICATION");
            System.out.println("========================================");

            System.out.println(
                    "Order ID     : " +
                    event.getOrderId()
            );

            System.out.println(
                    "Product      : " +
                    event.getProductName()
            );

            System.out.println(
                    "Quantity     : " +
                    event.getQuantity()
            );

            System.out.println(
                    "Price        : " +
                    event.getPrice()
            );

            System.out.println(
                    "Username     : " +
                    event.getUsername()
            );

            System.out.println("========================================");
            System.out.println();


        } catch (Exception e) {

            System.out.println(
                    "Error while processing Kafka message: "
                    + e.getMessage()
            );
        }
    }
}
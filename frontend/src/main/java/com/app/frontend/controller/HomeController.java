package com.app.frontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";
    }


    @GetMapping("/login")
    public String login() {
        return "login";
    }


    @GetMapping("/register")
    public String register() {
        return "register";
    }


    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }


    @GetMapping("/orders")
    public String orders() {
        return "orders";
    }


    @GetMapping("/create-order")
    public String createOrder() {
        return "create-order";
    }


    @GetMapping("/edit-order")
    public String editOrder() {
        return "edit-order";
    }


    @GetMapping("/profile")
    public String profile() {
        return "profile";
    }

}

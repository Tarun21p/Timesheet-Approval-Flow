package com.excelr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.excelr.service.UserService;

import java.util.Map;


@CrossOrigin  // This will connect the database with react.js

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        userService.authenticateUser(username, password)
                .ifPresent(user -> {
                    // Handle successful authentication, return user type or other details
                    // For simplicity, let's just return the user type as a string
                    credentials.put("userType", user.getUsername());
                });

        return credentials;
    }
}


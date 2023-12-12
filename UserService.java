package com.excelr.service;

import java.util.Optional;

import com.excelr.entity.User;

public interface UserService {
    Optional<User> authenticateUser(String username, String password);
}

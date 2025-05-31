package com.movie.Moviebackend.controller;

import com.movie.Moviebackend.model.User;
import com.movie.Moviebackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.Logger;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private final String uploadDir = Paths.get("uploads").toAbsolutePath().toString();
    private static final Logger logger = Logger.getLogger(UserController.class.getName());

    public UserController() {
        createUploadDirIfNotExists();
    }

    private void createUploadDirIfNotExists() {
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            if (directory.mkdirs()) {
                logger.info("Upload directory created: " + uploadDir);
            } else {
                logger.severe("Failed to create upload directory: " + uploadDir);
            }
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("password") String password,
            @RequestParam("confirmPassword") String confirmPassword,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) {

        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            return new ResponseEntity<>("Email is already registered", HttpStatus.BAD_REQUEST);
        }

        if (!password.equals(confirmPassword)) {
            return new ResponseEntity<>("Passwords do not match", HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPhone(phone);
        user.setPassword(password);

        if (profileImage != null && !profileImage.isEmpty()) {
            try {
                String fileName = UUID.randomUUID().toString() + "_" + profileImage.getOriginalFilename();
                File file = new File(uploadDir + File.separator + fileName);
                profileImage.transferTo(file);
                user.setProfileImagePath(fileName);
                logger.info("Profile image saved as: " + fileName);
            } catch (IOException e) {
                logger.severe("Failed to store image: " + e.getMessage());
                return new ResponseEntity<>("Failed to store image", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        userRepository.save(user);
        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }

    @GetMapping("/details")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/login")
    public ResponseEntity<User> getUserByEmailAndPassword(
            @RequestParam("email") String email,
            @RequestParam("password") String password) {
        
        Optional<User> user = userRepository.findByEmailAndPassword(email, password);
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // New method to get user by email
    @GetMapping("/profile")
    public ResponseEntity<User> getUserByEmail(
            @RequestParam("email") String email) {
        
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

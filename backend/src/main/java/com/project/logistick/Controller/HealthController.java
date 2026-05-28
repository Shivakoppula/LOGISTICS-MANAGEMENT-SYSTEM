package com.project.logistick.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {
    @GetMapping("/health")
    public String health() {
        return "OK";
    }
    
    @GetMapping("/")
    public String root() {
        return "App is running! Try /login.html";
    }
}

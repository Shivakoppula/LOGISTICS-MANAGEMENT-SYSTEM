package com.project.logistick.config;

import javax.sql.DataSource;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseConfiguration {

    @Bean
    public DataSource dataSource() {
        // Try to read DATABASE_URL first (Railway, Heroku standard)
        String databaseUrl = System.getenv("DATABASE_URL");
        
        if (databaseUrl != null && !databaseUrl.isEmpty()) {
            // Parse DATABASE_URL format: postgresql://user:password@host:port/database
            return createDataSourceFromDatabaseUrl(databaseUrl);
        }
        
        // Fall back to individual environment variables
        String url = System.getenv("SPRING_DATASOURCE_URL");
        String username = System.getenv("SPRING_DATASOURCE_USERNAME");
        String password = System.getenv("SPRING_DATASOURCE_PASSWORD");
        
        // Final fallback to properties file defaults
        if (url == null) {
            url = "jdbc:postgresql://localhost:5432/logstickproject";
        }
        if (username == null) {
            username = "postgres";
        }
        if (password == null) {
            password = "root";
        }
        
        return DataSourceBuilder.create()
                .url(url)
                .username(username)
                .password(password)
                .driverClassName("org.postgresql.Driver")
                .build();
    }
    
    /**
     * Parse DATABASE_URL and create DataSource
     * Format: postgresql://user:password@host:port/database or postgres://user:password@host:port/database
     */
    private DataSource createDataSourceFromDatabaseUrl(String databaseUrl) {
        try {
            String url = databaseUrl.trim();
            String username = "postgres";
            String password = "";
            
            System.out.println("Parsing DATABASE_URL: " + url.substring(0, Math.min(50, url.length())) + "...");
            
            // Handle postgres:// or postgresql:// prefix
            if (url.startsWith("postgres://")) {
                url = url.replace("postgres://", "postgresql://");
            }
            
            // Now extract credentials if present
            if (url.contains("@")) {
                int atIndex = url.indexOf("@");
                String credentialsPart = url.substring(0, atIndex);
                String hostPart = url.substring(atIndex + 1);
                
                // Extract credentials
                if (credentialsPart.contains(":")) {
                    int colonIndex = credentialsPart.lastIndexOf(":");
                    username = credentialsPart.substring(credentialsPart.lastIndexOf("/") + 1, colonIndex);
                    password = credentialsPart.substring(colonIndex + 1);
                } else {
                    username = credentialsPart.substring(credentialsPart.lastIndexOf("/") + 1);
                }
                
                // Reconstruct JDBC URL
                url = "jdbc:postgresql://" + hostPart;
            } else {
                // No credentials, just convert to JDBC format
                if (url.startsWith("postgresql://")) {
                    url = "jdbc:" + url;
                }
            }
            
            System.out.println("Parsed DB URL: " + url.substring(0, Math.min(60, url.length())) + "...");
            System.out.println("Username: " + username);
            
            return DataSourceBuilder.create()
                    .url(url)
                    .username(username)
                    .password(password)
                    .driverClassName("org.postgresql.Driver")
                    .build();
        } catch (Exception e) {
            // If parsing fails, fall back to defaults
            System.err.println("Failed to parse DATABASE_URL: " + e.getMessage());
            e.printStackTrace();
            return DataSourceBuilder.create()
                    .url("jdbc:postgresql://localhost:5432/logstickproject")
                    .username("postgres")
                    .password("root")
                    .driverClassName("org.postgresql.Driver")
                    .build();
        }
    }
}

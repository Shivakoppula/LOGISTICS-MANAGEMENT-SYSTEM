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
     * Format: postgresql://user:password@host:port/database
     */
    private DataSource createDataSourceFromDatabaseUrl(String databaseUrl) {
        try {
            // Remove the postgresql:// prefix
            String url = databaseUrl;
            if (url.startsWith("postgresql://")) {
                url = "jdbc:" + url;
            } else if (url.startsWith("postgres://")) {
                url = url.replace("postgres://", "jdbc:postgresql://");
            }
            
            // Extract credentials
            String username = "postgres";
            String password = "";
            
            if (url.contains("@")) {
                String[] parts = url.split("@");
                String credentials = parts[0];
                
                if (credentials.contains(":")) {
                    String[] credParts = credentials.split(":");
                    username = credParts[credParts.length - 2];
                    password = credParts[credParts.length - 1];
                }
            }
            
            return DataSourceBuilder.create()
                    .url(url)
                    .username(username)
                    .password(password)
                    .driverClassName("org.postgresql.Driver")
                    .build();
        } catch (Exception e) {
            // If parsing fails, fall back to defaults
            System.err.println("Failed to parse DATABASE_URL: " + e.getMessage());
            return DataSourceBuilder.create()
                    .url("jdbc:postgresql://localhost:5432/logstickproject")
                    .username("postgres")
                    .password("root")
                    .driverClassName("org.postgresql.Driver")
                    .build();
        }
    }
}

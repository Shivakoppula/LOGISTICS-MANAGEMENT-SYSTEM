package com.project.logistick;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class LogistickApplication {

	public static void main(String[] args) {
		String databaseUrl = System.getenv("DATABASE_URL");
		if (databaseUrl != null && !databaseUrl.isEmpty()) {
			System.out.println("DEBUG: DATABASE_URL found: " + databaseUrl.replaceAll(":.*@", ":***@"));
			String jdbcUrl = databaseUrl;
			if (databaseUrl.startsWith("postgres://")) {
				jdbcUrl = "jdbc:postgresql://" + databaseUrl.substring(11);
			} else if (databaseUrl.startsWith("postgresql://")) {
				jdbcUrl = "jdbc:postgresql://" + databaseUrl.substring(13);
			}
			
			System.out.println("DEBUG: Setting spring.datasource.url to " + jdbcUrl.replaceAll(":.*@", ":***@"));
			System.setProperty("spring.datasource.url", jdbcUrl);
			
			// Optional: Parse user/pass if not handled by url
			try {
				java.util.regex.Matcher matcher = java.util.regex.Pattern.compile("jdbc:postgresql://([^:]+):([^@]+)@(.*)").matcher(jdbcUrl);
				if (matcher.find()) {
					String user = matcher.group(1);
					String pass = matcher.group(2);
					String rest = matcher.group(3);
					System.setProperty("spring.datasource.url", "jdbc:postgresql://" + rest);
					System.setProperty("spring.datasource.username", user);
					System.setProperty("spring.datasource.password", pass);
				}
			} catch (Exception e) {
				// Fallback to the original jdbcUrl if regex fails
			}
		}
		SpringApplication.run(LogistickApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
					.allowedOrigins("*")
					.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
					.allowedHeaders("*")
					.allowCredentials(false)
					.maxAge(3600);
			}
		};
	}

}

package com.project.logistick.login;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

@Entity
public class UserLogin {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@NotNull
	@Email
	private String email;
	@NotNull
	@Length(min=5,max = 25)
	private String password;
	@ManyToOne
	@JoinColumn(name = "admin_id")
	private AdminLogin admin;
	public UserLogin(int id, @NotNull @Email String email, @NotNull @Length(min = 5, max = 25) String password,
			AdminLogin admin) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.admin = admin;
	}
	public UserLogin() {
		super();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public AdminLogin getAdmin() {
		return admin;
	}
	public void setAdmin(AdminLogin admin) {
		this.admin = admin;
	}
	
}

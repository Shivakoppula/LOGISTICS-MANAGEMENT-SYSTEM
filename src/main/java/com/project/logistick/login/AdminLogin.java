package com.project.logistick.login;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;

@Entity
public class AdminLogin {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@NotNull
	private long phonenumber;
	@NotNull
	@Length(min=5,max=25)
	private String password;
	@OneToMany(cascade = CascadeType.ALL)
	private List<UserLogin> user;
	public AdminLogin(@NotNull long phonenumber, @NotNull @Length(min = 5, max = 25) String password,
			List<UserLogin> user) {
		super();
		this.phonenumber = phonenumber;
		this.password = password;
		this.user = user;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public long getPhonenumber() {
		return phonenumber;
	}
	public void setPhonenumber(long phonenumber) {
		this.phonenumber = phonenumber;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public List<UserLogin> getUser() {
		return user;
	}
	public void setUser(List<UserLogin> user) {
		this.user = user;
	}
	public AdminLogin() {
		super();
	}
	
	
}

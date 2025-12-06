package com.project.logistick.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.logistick.login.AdminLogin;

@Repository
public interface AdminLogin_Repo extends JpaRepository<AdminLogin, Long> {
	 AdminLogin findByPhonenumber(long phone);

}

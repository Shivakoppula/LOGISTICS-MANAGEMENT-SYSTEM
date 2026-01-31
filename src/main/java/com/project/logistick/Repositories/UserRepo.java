package com.project.logistick.Repositories;
import java.util.List;
//import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.logistick.login.UserLogin;

@Repository
public interface UserRepo extends JpaRepository<UserLogin,Integer> {

	UserLogin findByEmail(String email);
	List<UserLogin> findByAdmin_Phonenumber(Long phoneNumber);

}

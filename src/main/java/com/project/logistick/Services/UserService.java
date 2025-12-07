package com.project.logistick.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.project.logistick.DTO.ResponceStucture;
import com.project.logistick.Exceptions.AdminDetailsNotFound;
import com.project.logistick.Repositories.UserRepo;
import com.project.logistick.login.UserLogin;

@Service
public class UserService {
	@Autowired
	UserRepo userrepo;
	ResponceStucture<UserLogin> rs=new ResponceStucture<UserLogin>();
	public ResponseEntity<ResponceStucture<UserLogin>> saveUser(UserLogin user) {
//		Optional<UserLogin> users=userrepo.findById(user.getId());
		UserLogin users=userrepo.findByEmail(user.getEmail());
		if(users!=null) {
			throw new AdminDetailsNotFound();
		}
		else {
			  userrepo.save(user);
				
				rs.setCode(HttpStatus.OK.value());
				rs.setMessage("Customer login with  "+user.getEmail()+"successfully");
				rs.setData(user);
			
		}
		return new ResponseEntity<ResponceStucture<UserLogin>>(rs,HttpStatus.OK);
	}
	public ResponseEntity<ResponceStucture<UserLogin>> getdetails(String email,String password) {
		UserLogin ul=userrepo.findByEmail(email);
		if(ul!=null && ul.getEmail().equals(email) && ul.getPassword().equals(password)) {
			rs.setCode(HttpStatus.OK.value());
			rs.setMessage("User login succesfully with details of"+ul.getEmail());
			rs.setData(ul);
			
		}
		else {
			throw new AdminDetailsNotFound();
		}
		return new ResponseEntity<ResponceStucture<UserLogin>>(rs,HttpStatus.OK);
		
	}
	public ResponseEntity<ResponceStucture<UserLogin>> updatedetails(String oldemail, String newemail) {
		UserLogin ul=userrepo.findByEmail(oldemail);
		if(ul!=null) {
			ul.setEmail(newemail);
			userrepo.save(ul);
			rs.setCode(HttpStatus.OK.value());
			rs.setMessage("Username "+ul.getEmail()+"changed successfully");
			rs.setData(ul);
			
		}
		else {
			throw new AdminDetailsNotFound();
		}
		return new ResponseEntity<ResponceStucture<UserLogin>>(rs,HttpStatus.OK);
		
		
	}
	
}

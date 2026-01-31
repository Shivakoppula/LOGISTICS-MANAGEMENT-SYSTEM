package com.project.logistick.Services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.project.logistick.DTO.ResponceStucture;
import com.project.logistick.Exceptions.AdminDetailsNotFound;
import com.project.logistick.Exceptions.UserDetailsNotFound;
import com.project.logistick.Repositories.AdminLogin_Repo;
import com.project.logistick.Repositories.UserRepo;
import com.project.logistick.login.AdminLogin;
import com.project.logistick.login.UserLogin;

@Service
public class AdminLogin_service {
//	
//	@Autowired
//	AdminLogin adminlogin;
	@Autowired
	AdminLogin_Repo adminRepo;
	
	ResponceStucture<AdminLogin> rs=new ResponceStucture<AdminLogin>();
	public ResponseEntity<ResponceStucture<AdminLogin>> save(AdminLogin details) {
		
           adminRepo.save(details);
			
			rs.setCode(HttpStatus.OK.value());
			rs.setMessage("Admin login details of id "+details.getPhonenumber()+" saved");
			rs.setData(details);
		
		return new ResponseEntity<ResponceStucture<AdminLogin>>(rs,HttpStatus.OK);
		
	}
	public ResponseEntity<ResponceStucture<AdminLogin>> change(long phone,String password,String newpassword) {
		AdminLogin ad=adminRepo.findByPhonenumber(phone);
		if(ad!=null && ad.getPhonenumber()==phone && ad.getPassword().equals(password)) {
//			ad.setPhonenumber(newphone);
			ad.setPassword(newpassword);
			adminRepo.save(ad);
			rs.setCode(HttpStatus.OK.value());
			rs.setMessage("Admin password changed for username "+phone);
//			rs.setData(ad);
		}
		else {
			rs.setCode(HttpStatus.NOT_FOUND.value());
			rs.setMessage("Incorrect password or username");
			throw new AdminDetailsNotFound();
			
		}

		return new ResponseEntity<ResponceStucture<AdminLogin>>(rs,HttpStatus.OK);
		
	}
	

	public ResponseEntity<ResponceStucture<AdminLogin>> getAdmin(long phone,String password) {
		AdminLogin ad=adminRepo.findByPhonenumber(phone);
		if(ad!=null && ad.getPhonenumber()==phone && ad.getPassword().equals(password)) {
			
			
				rs.setCode(HttpStatus.OK.value());
				rs.setMessage("Login succesfull");
//				rs.setData(ad);
			
		}
		else {
			rs.setCode(HttpStatus.NOT_FOUND.value());
			rs.setMessage("Login unsuccesfull");
			rs.setMessage("Invalid password or username");
		}
		return new ResponseEntity<ResponceStucture<AdminLogin>>(rs,HttpStatus.OK);
		
	}
	public void delete(long phone) {
		AdminLogin ad=adminRepo.findByPhonenumber(phone);
           if(ad!=null && ad.getPhonenumber()==phone) {
			
			rs.setCode(HttpStatus.OK.value());
			rs.setMessage("Admin details deleting"+phone);
			rs.setData(ad);
			adminRepo.delete(ad);
		}
           else {
        	   throw new AdminDetailsNotFound();
           }
		
	}
	@Autowired
	UserRepo userepo;
	public List<UserLogin> getusers(Long phoneNumber) {
        return userepo.findByAdmin_Phonenumber(phoneNumber);
    }

	
	
	@Autowired
	UserRepo userrepo;
	public ResponseEntity<ResponceStucture<UserLogin>> deletedetails(String email) {
		ResponceStucture<UserLogin> rs=new ResponceStucture<UserLogin>();
		UserLogin user=userrepo.findByEmail(email);
		if(user!=null && user.getEmail().equals(email)) {
			rs.setCode(HttpStatus.OK.value());
			rs.setMessage("User details deleting "+email);
			rs.setData(user);
			userrepo.delete(user);
			
		}
		else {
			rs.setCode(HttpStatus.NOT_FOUND.value());
			rs.setMessage("User details not exist "+email);
			throw new UserDetailsNotFound();
		}
		return new ResponseEntity<ResponceStucture<UserLogin>>(rs,HttpStatus.OK);
		
	}


	
}

package com.project.logistick.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.logistick.DAO.ResponceStucture;
import com.project.logistick.Entitiesclasses.Address;

import com.project.logistick.Entitiesclasses.Unloading;
import com.project.logistick.Exceptions.AdressNotFound;
import com.project.logistick.Exceptions.UnloadAdressNotFOund;
import com.project.logistick.Repositories.Adress_Repo;
import com.project.logistick.Repositories.Unloading_repo;

@Service
public class Unloading_Services {
	@Autowired
	private Adress_Repo adressrepo;
	@Autowired
	private Unloading_repo unloadrepo;
	Address ad=new Address();
	public ResponseEntity<ResponceStucture<Unloading>> addDeliverAdress(Unloading unload) {
//		
//       Optional<Address>adopt=adress.findById(unload.getId());
		Boolean present=adressrepo.existsById(unload.getId());
		ResponceStucture<Unloading> rs=new ResponceStucture<Unloading>();
		
		if(present) {
			unloadrepo.save(unload);
			
			rs.setCode(HttpStatus.OK.value());
			rs.setMessage("Delivery Adress details of id Found");
			rs.setData(unload);	
		   }
		else
		{

			throw new AdressNotFound();
		}
		return new ResponseEntity<ResponceStucture<Unloading>>(HttpStatus.OK );
		
		
	}

	public ResponseEntity<ResponceStucture<Unloading>> findDelivery(int id) {
		
		Address ad=adressrepo.findById(id).get();
		
		ResponceStucture<Address> rs=new ResponceStucture<Address>();
		if(ad!=null) {
			rs.setCode(HttpStatus.OK.value());
			rs.setMessage("Adress details for unloading");
			rs.setData(ad);			
		}
		else
		{

			throw new AdressNotFound();
		}
		return new ResponseEntity<ResponceStucture<Unloading>>(HttpStatus.OK );	
	}

	public ResponseEntity<ResponceStucture<Unloading>> cancleDetails(int id) {

		 Optional<Unloading>loadopt=unloadrepo.findById(id);
			
			ResponceStucture<Unloading> rs=new ResponceStucture<Unloading>();
			if(loadopt.isPresent()) {
				 
					rs.setCode(HttpStatus.OK.value());
					rs.setMessage("Deleting unloading address details with id "+id+" Deleted");
					rs.setData(loadopt.get());
					unloadrepo.deleteById(id);
				
			}
			else
			{ 

				throw new UnloadAdressNotFOund();
			}

			return new ResponseEntity<ResponceStucture<Unloading>>(rs,HttpStatus.OK );
				
	}

}

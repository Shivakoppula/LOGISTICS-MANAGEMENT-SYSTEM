package com.project.logistick.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.project.logistick.DTO.ResponceStucture;
import com.project.logistick.Entitiesclasses.Cargo;
import com.project.logistick.Entitiesclasses.Items;
import com.project.logistick.Exceptions.CargoNotFound;
import com.project.logistick.Repositories.Cargo_Repo;
import com.project.logistick.Repositories.Items_Repo;

@Service
public class Items_Service {
	@Autowired
	Items_Repo items;
	@Autowired
	Cargo_Repo cargo;
	
	ResponceStucture<Items> rs=new ResponceStucture<Items>();
	public void placeOrder(String name,int quantity) {
		// TODO Auto-generated method stub
		Items item=new Items();
		Cargo car=cargo.findByName(name);
		
		if(car!=null && quantity<car.getCount()) {
			item.setCount(quantity);
			item.setDiscription(car.getDiscription());
			item.setName(car.getName());
			item.setWeight(car.getWeight());
			double cost=100*(item.getWeight()*quantity);
			item.setPrice(cost);
			items.save(item);
			car.setCount(car.getCount()-quantity);
			cargo.save(car);
			
			
			items.save(item);
			rs.setCode(HttpStatus.OK.value());
			rs.setMessage("Order with"+name+"placed successfully");
			rs.setData(item);
			
		}else {
			throw new CargoNotFound();
		}
		
	}
	

}

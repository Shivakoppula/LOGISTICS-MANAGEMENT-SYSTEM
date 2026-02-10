package com.project.logistick.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.logistick.DAO.ResponceStucture;
import com.project.logistick.DTO.OrderDto;
import com.project.logistick.Entitiesclasses.Cargo;
import com.project.logistick.Entitiesclasses.Order;
import com.project.logistick.Services.Cargo_Services;
import com.project.logistick.Services.Order_Services;
import com.project.logistick.Services.UserService;
import com.project.logistick.login.UserLogin;

import jakarta.validation.Valid;

@RestController
public class User_Controller {
	

	
//	//cargo crud operations
	@Autowired
	private Cargo_Services cargosr;
	
	@PostMapping("/savingcargodetails")
	public ResponseEntity<ResponceStucture<Cargo>> cargoDetails(@RequestBody @Valid Cargo cargo)
	{
		return cargosr.saveCargo(cargo);
	}
	
	@GetMapping("/cargofind/{name}")
	public ResponseEntity<ResponceStucture<Cargo>> cargoTrack(@PathVariable String name)
	{
		return cargosr.trackCargo(name);
	}
	@GetMapping("/cargofetch/{id}")
	public ResponseEntity<ResponceStucture<Cargo>> Track(@PathVariable int id)
	{
		return cargosr.trackCargos(id);
	}
	
	@DeleteMapping("/deletecargo/{id}")
	public ResponseEntity<ResponceStucture<Cargo>> deleteCargo(@PathVariable int id)
	{
		return cargosr.removeCargo(id);
	}
	
	
	
	//order details with saving  tracing and canceling
	@Autowired
	private Order_Services orderservice;
	//saving
	@PostMapping("/Placingorder")
	public void orderDetails(@RequestBody @Valid OrderDto order)
	{
		orderservice.orderPlacing(order);
	}
	
	@GetMapping("/TrackingOrder/{id}")
	public ResponseEntity<ResponceStucture<Order>> trackingOrder(@PathVariable int id)
	{
		return orderservice.tracingOrder(id);
	}
	@PutMapping("cancleorder/{id}")
	public ResponseEntity<ResponceStucture<Order>> cancleOrder(@PathVariable int id)
	{
		return orderservice.cancleOrder(id);
	}
	
	//user details of login
	@Autowired
	UserService userservice;
	
	@PostMapping("/save")
	public ResponseEntity<ResponceStucture<UserLogin>> save(@RequestBody @Valid UserLogin user) {
	  return userservice.saveUser(user);
	}
	
	@GetMapping("/details/{email}/{password}")
	public ResponseEntity<ResponceStucture<UserLogin>> getDetails(@PathVariable String email,@PathVariable String password) {
	  return userservice.getdetails(email,password);
	}
	
	@PutMapping("/update/{oldemail}/{newemail}")
	public ResponseEntity<ResponceStucture<UserLogin>> updateDetails(@PathVariable String oldemail,@PathVariable String newemail) {
	   return userservice.updatedetails(oldemail,newemail);
	}
	
}

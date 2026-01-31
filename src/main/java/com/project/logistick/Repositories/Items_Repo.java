package com.project.logistick.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.logistick.Entitiesclasses.Items;
@Repository
public interface Items_Repo extends JpaRepository<Items, Integer> {

}

package com.stackroute.favouriteservice;

import com.stackroute.favouriteservice.model.Favourite;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

class FavouriteTest {

	private Favourite favourite;

	@BeforeEach
	public void setUp() throws Exception {
		
		favourite = new Favourite();
		
		favourite.setId("bjbjj");
		favourite.setCountry("Srilanka");
		favourite.setName("johnsmith");
		favourite.setFavouriteCreatedBy("johns");

		favourite.setFavouriteCreationDate(LocalDateTime.now());

		
	}

	@AfterEach
	public void tearDown() throws Exception {
		
		
	}

	@Test
	public void verifyFavourite(){
		favourite = new Favourite();

		favourite.setId("bjbjj");
		favourite.setCountry("Srilanka");
		favourite.setName("johnsmith");
		favourite.setFavouriteCreatedBy("johns");

		favourite.setFavouriteCreationDate(LocalDateTime.now());
	}

//	@Test
//	public void Beantest() {
//		BeanTester beanTester = new BeanTester();
//        beanTester.getFactoryCollection().addFactory(LocalDateTime.class, new LocalDateTimeFactory());
//        beanTester.testBean(News.class);
//
//
//	}

}

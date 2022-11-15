package com.stackroute.userservice;

import com.stackroute.userservice.model.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
//import org.meanbean.test.BeanTester;

import java.time.LocalDateTime;
@SpringBootTest
class UserTest {

	private User userProfile;

	@BeforeEach
	public void setUp() throws Exception {
		
		//LocalDateTime localDateTime = LocalDateTime.now();
		
		userProfile = new User();
		
		userProfile.setUserId("johnsmith");
		userProfile.setFirstName("John");
		userProfile.setLastName("Smith");
//		userProfile.setContact("1234567890");
		userProfile.setUserAddedDate(LocalDateTime.now());
		
	}

	@AfterEach
	public void tearDown() throws Exception {
		
		
	}

	@Test
	public void verifyUser(){

		//LocalDateTime localDateTime = LocalDateTime.now();

		userProfile = new User();

		userProfile.setUserId("johnsmith");
		userProfile.setFirstName("John");
		userProfile.setLastName("Smith");
//		userProfile.setContact("1234567890");
		userProfile.setUserAddedDate(LocalDateTime.now());

	}

//	@Test
//	public void Beantest() {
//		BeanTester beanTester = new BeanTester();
//        beanTester.getFactoryCollection().addFactory(LocalDateTime.class, new LocalDateTimeFactory());
//        beanTester.testBean(User.class);
//
//
//	}

}

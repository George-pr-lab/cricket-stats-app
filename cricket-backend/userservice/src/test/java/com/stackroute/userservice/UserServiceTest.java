package com.stackroute.userservice;

import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotExistsException;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.repository.UserRepository;
import com.stackroute.userservice.service.UserServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.annotation.Rollback;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class UserServiceTest {

	@Mock
	private UserRepository userRepository;
	@InjectMocks
	private UserServiceImpl userService;

	private User user;
	
	private List<User> userList;

	@BeforeEach
	public void setUp() throws Exception {

		MockitoAnnotations.initMocks(this);
		userList = new ArrayList<User>();
		user = new User("johns", "John", "Smith", "1234567890",null, LocalDateTime.now());
		User user1 = new User("chris", "Chris", "Adler", "1234567891",null, LocalDateTime.now());
		User user2 = new User("willd", "William", "Davis", "1234567892",null, LocalDateTime.now());
		userList.add(user1);
		userList.add(user2);
		userList.add(user);

	}

	@AfterEach
	public void tearDown() throws Exception {
		user = null;
		userList = null;
	}

	@Test
	public void testRegisterUserSuccess() throws UserNotExistsException, UserAlreadyExistsException {

		when(userRepository.findById(any())).thenReturn(Optional.empty());
		when(userRepository.save(any())).thenReturn(user);
		userService.saveUser(user);
		assertEquals(true, userService.saveUser(user));

	}

	@Test
	public void testRegisterUserFailure() throws UserNotExistsException, UserAlreadyExistsException {

		when(userRepository.findById(any())).thenReturn(Optional.of(user));
		assertThrows(UserAlreadyExistsException.class,
				() -> userService.saveUser(user));

	}
	
	@Test
	public void testUpdateUserSuccess() throws UserNotExistsException {

		when(userRepository.getOne(any())).thenReturn(user);
		when(userRepository.saveAndFlush(any())).thenReturn(user);
		assertEquals(user, userService.updateUser(user));

	}
	

	

	
	@Test
	public void testDeleteUserFailure() throws UserNotExistsException {

		when(userRepository.getOne(any())).thenReturn(null);
		assertThrows(UserNotExistsException.class,
				() -> userService.deleteUser(user.getUserId()));
		verify(userRepository,times(0)).deleteById(any());
		
	}
	@Test
	public void testDeleteUserSuccess() throws UserNotExistsException {
		Optional<User> userRecord = Optional.of(user);
		when(userRepository.findById(any())).thenReturn(userRecord);
		userService.deleteUser(anyString());

//		verify(favouriteRepository, times(1)).getOne(any());
		verify(userRepository, times(1)).deleteById(any());

	}
	@Test
	public void testGetAllUsersSuccess() throws UserNotExistsException {

		when(userRepository.findAll()).thenReturn(userList);
		
		assertEquals(userList, userService.getAllUser());
		verify(userRepository,times(1)).findAll();
	}

}

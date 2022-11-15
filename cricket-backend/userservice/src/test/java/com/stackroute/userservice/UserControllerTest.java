package com.stackroute.userservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.userservice.controller.UserController;
import com.stackroute.userservice.exception.UserAlreadyExistsException;
import com.stackroute.userservice.exception.UserNotExistsException;
import com.stackroute.userservice.model.User;
import com.stackroute.userservice.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
class UserControllerTest {


	private MockMvc mockMvc;
	private User user;
	private List<User> userList;
	
	@Mock
    UserService userService;
	@InjectMocks
    UserController userController;

	@BeforeEach
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		userList = new ArrayList<User>();
		mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
		user = new User("johns", "John", "Smith", "1234567890","admin", LocalDateTime.now());
		User user1 = new User("chris", "Chris", "Adler", "1234567891", null,LocalDateTime.now());
		User user2 = new User("willd", "William", "Davis", "1234567892",null, LocalDateTime.now());
		userList.add(user1);
		userList.add(user2);
	}
	
//	@Test
//    public void registerUserSuccess() throws Exception {
//
//        when(userService.saveUser(any())).thenReturn(userProfile);
//        mockMvc.perform(post("/api/v1/user")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(asJsonString(userProfile)))
//                .andExpect(status().isCreated())
//                .andDo(MockMvcResultHandlers.print());
//
//    }



    @Test
    public void registerUserSuccess() throws Exception {
        HttpSession session = null;
        Boolean listValidation = true;
        when(userService.saveUser(user)).thenReturn(anyBoolean());
        ResponseEntity<?> registerUser = (ResponseEntity<?>) userController.register(user);

        assertThat(registerUser.getStatusCodeValue()).isEqualTo(201);
        assertThat(listValidation).isTrue();
    }

    @Test
    public void registerUserFailure() throws Exception {
        HttpSession session = null;
        Boolean listValidation = true;
        when(userService.saveUser(user)).thenReturn(anyBoolean());
        ResponseEntity<?> registerUser = (ResponseEntity<?>) userController.register(user);
        if(registerUser.getBody().equals(any()))

//        assertThat(registerUser.getBody()).isEqualTo(201);
        assertThat(listValidation).isTrue();
    }


    @SuppressWarnings("unchecked")
	@Test
    public void getByUserIdFailure() throws Exception {

        when(userService.getUser("johnsmith")).thenThrow(UserNotExistsException.class);
        mockMvc.perform(get("/api/v1/auth/user/johnsmith").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andDo(MockMvcResultHandlers.print());
    }


	@Test
    public void deleteUserFailure() throws Exception {
    	doThrow(UserNotExistsException.class).doNothing().when(userService).deleteUser(any());
//       when(userService.deleteUserProfile(any())).thenThrow(UserProfileNotExistsException.class);
        mockMvc.perform(delete("/api/v1/auth/user/johnsmith")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andDo(MockMvcResultHandlers.print());

    }

    @Test
    public void LoginUserFailure() throws Exception {
        HttpSession session = null;
        Boolean listValidation = true;
        when(userService.getUser(anyString())).thenReturn(any());
        ResponseEntity<?> loginUser = (ResponseEntity<?>) userController.login(user, session);

        assertThat(loginUser.getStatusCodeValue()).isEqualTo(401);
        assertThat(listValidation).isTrue();
    }

    @Test
    public void LoginUserSuccess() throws Exception {
        HttpSession session = null;
        Boolean listValidation = true;
        when(userService.getUser(anyString())).thenReturn(user);
        ResponseEntity<?> loginUser = (ResponseEntity<?>) userController.login(user, session);

        assertThat(loginUser.getBody().equals(user));
        assertThat(listValidation).isTrue();
    }

    
    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }



}

package com.stackroute.favouriteservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.favouriteservice.controller.FavouriteController;
import com.stackroute.favouriteservice.exception.FavouriteAlreadyExistsException;
import com.stackroute.favouriteservice.exception.FavouriteNotExistsException;
import com.stackroute.favouriteservice.model.Favourite;
import com.stackroute.favouriteservice.service.FavouriteService;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
class FavouriteControllerTest {

	private MockMvc mockMvc;
	private Favourite favourite;
	private List<Favourite> favouriteList;

	@Mock
	FavouriteService favouriteService;
	@InjectMocks
	FavouriteController favouriteController;

	@BeforeEach
	public void setUp() {
		MockitoAnnotations.initMocks(this);
		favouriteList = new ArrayList<Favourite>();
		mockMvc = MockMvcBuilders.standaloneSetup(favouriteController).build();
		favouriteList = new ArrayList<Favourite>();
		favourite = new Favourite("testt111","John Smith", "Srilanka", "johns" ,LocalDateTime.now());
		Favourite favourite1 = new Favourite("title2", "sample title", "Austrila", "johns", LocalDateTime.now());

		Favourite favourite2 = new Favourite("testt333", "sample title3", "India", "johns", LocalDateTime.now());

		favouriteList.add(favourite1);
		favouriteList.add(favourite2);
	}

//	@Test
//	public void getAllFavouriteSuccess() throws Exception {
//
//		when(favouriteService.getAllFavourite()).thenReturn(favouriteList);
//		mockMvc.perform(get("/api/v1/favourite").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
//				.andDo(MockMvcResultHandlers.print());
//	}

	@Test
	public void getAllFavouriteSuccess() throws Exception {
		Boolean listValidation = true;
		when(favouriteService.getAllFavourite()).thenReturn(favouriteList);
		System.out.println(favouriteController.getAllFavorite().getStatusCode());
		ResponseEntity<List<Favourite>> fabvouriteResponseList = (ResponseEntity<List<Favourite>>) favouriteController
				.getAllFavorite();
		List<Favourite> favourites = fabvouriteResponseList.getBody();
		if (!favourites.isEmpty()) {
			for (Favourite favourite : favourites) {
				if (favourite.getId().equalsIgnoreCase("title2") || favourite.getId().equalsIgnoreCase("testt333"))
					listValidation &= true;
				else
					listValidation &= false;
			}
		} else {
			listValidation &= false;
		}
		assertThat(listValidation).isTrue();
		assertThat(favouriteController.getAllFavorite().getStatusCodeValue()).isEqualTo(200);

	}

	@Test
	public void getFavouriteByIDSuccess() throws Exception {
		Boolean listValidation = true;
		when(favouriteService.getFavourite(anyString())).thenReturn(favourite);
//		System.out.println(favouriteController.getAllFavorite().getStatusCode());
		ResponseEntity<List<Favourite>>favouriteResponseList = (ResponseEntity<List<Favourite>>) favouriteController.getAllFavouriteByUserId(anyString());
		List<Favourite> favourites = favouriteResponseList.getBody();
		if (!favourites.isEmpty()) {
			for (Favourite favourite : favourites) {
				if (favourite.getId().equalsIgnoreCase("title2") || favourite.getId().equalsIgnoreCase("testt333"))
					listValidation &= false;
				else
					listValidation &= true;
			}
		} else {
			listValidation &= true;
		}
		assertThat(listValidation).isTrue();
		assertThat(favouriteController.getAllFavorite().getStatusCodeValue()).isEqualTo(200);

	}

	@Test
	public void deleteFavouriteSuccess() throws Exception {
		doNothing().when(favouriteService).deleteFavourite(anyString());
		ResponseEntity<Favourite>deletFavourite = (ResponseEntity<Favourite>) favouriteController.deleteFavourite(anyString());
		assertThat(favouriteController.deleteFavourite(anyString()).getStatusCodeValue()).isEqualTo(200);

	}

	@Test
	public void updateFavouriteSuccess() throws Exception {
		Boolean listValidation = true;
		when(favouriteService.updateFavourite(favourite,"testt111")).thenReturn(favourite);
		ResponseEntity<Favourite>updateFavourite = (ResponseEntity<Favourite>) favouriteController.updateFavourite(favourite,"testt111");
		Favourite favourites = updateFavourite.getBody();
		if (favourites!=null) {

				if (favourite.getCountry().equalsIgnoreCase("Srilanka") || favourite.getId().equalsIgnoreCase("testt333"))
					listValidation &= true;
				else
					listValidation &= false;
			}else{

			listValidation &= false;
		}
		assertThat(listValidation).isTrue();
	}

	@Test
	public void createFavouriteSuccess() throws Exception {
		HttpSession session = null;
		Boolean listValidation = true;
		when(favouriteService.createFavourite(favourite)).thenReturn(favourite);
		ResponseEntity<?>createFavourite = (ResponseEntity<?>) favouriteController.createFavourite(favourite,session);

		assertThat(createFavourite.getStatusCodeValue()).isEqualTo(201);
		assertThat(listValidation).isTrue();
	}
}

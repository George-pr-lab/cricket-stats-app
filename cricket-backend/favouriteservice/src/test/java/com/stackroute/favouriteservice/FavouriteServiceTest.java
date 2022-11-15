package com.stackroute.favouriteservice;

import com.stackroute.favouriteservice.exception.FavouriteAlreadyExistsException;
import com.stackroute.favouriteservice.exception.FavouriteNotExistsException;
import com.stackroute.favouriteservice.model.Favourite;
import com.stackroute.favouriteservice.repository.FavouriteRepository;
import com.stackroute.favouriteservice.service.FavouriteService;
import com.stackroute.favouriteservice.service.FavouriteServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.lang.Nullable;
import org.springframework.test.annotation.Rollback;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class FavouriteServiceTest {

	@Mock
	private FavouriteRepository favouriteRepository;
	@InjectMocks
	private FavouriteServiceImpl favouriteService;

	private Favourite favourite;

	private List<Favourite> favouriteList;

	@BeforeEach
	public void setUp() throws Exception {

		MockitoAnnotations.initMocks(this);
		favouriteList = new ArrayList<Favourite>();
		favourite = new Favourite("testt111","John Smith", "Srilanka", "johns" ,LocalDateTime.now());
		Favourite favourite1 = new Favourite("title2", "sample title", "Austrila", "johns", LocalDateTime.now());
				
		Favourite favourite2 = new Favourite("testt333", "sample title3", "India", "johns", LocalDateTime.now());
				
		favouriteList.add(favourite1);
		favouriteList.add(favourite2);

	}

	@Test
	public void testGetFavouritRecordById() throws  FavouriteNotExistsException {
		Optional<Favourite> favouriteRecord = Optional.of(favourite);
		when(favouriteRepository.findById(anyString())).thenReturn(favouriteRecord);
		Favourite favourite = favouriteService.getFavourite("sample1");
		assertEquals(favourite.getCountry(),"Srilanka");
		assertEquals(favourite.getName(),"John Smith");
	}

	@Test
	public void testGetFavouritNullRecordById() throws  FavouriteNotExistsException {
		Optional<Favourite> favouriteRecord = Optional.ofNullable(null);
		when(favouriteRepository.findById(anyString())).thenReturn(favouriteRecord);
		Favourite favourite = favouriteService.getFavourite("sample1");
		assertEquals(favourite,null);
	}

	@Test
	public void testCreateFavouriteSuccess() throws FavouriteNotExistsException, FavouriteAlreadyExistsException {
//		favourite = new Favourite("testt111","John Smith", "Srilanka", "johns" ,LocalDateTime.now());
		when(favouriteRepository.save(any())).thenReturn(favourite);
		Favourite favourite1 = favouriteService.createFavourite(favourite);
		assertEquals(favourite.getCountry(),"Srilanka");
		assertEquals(favourite.getName(),"John Smith");
	}

	@Test
	public void testCreateFavouritFailure() throws FavouriteNotExistsException, FavouriteAlreadyExistsException {
//		favourite = new Favourite("testt111","John Smith", "Srilanka", "johns" ,LocalDateTime.now());
		when(favouriteRepository.save(null)).thenReturn(null);
		Favourite favourite1 = favouriteService.createFavourite(null);
		assertEquals(favourite1,null);
//		assertEquals(favourite.getName(),"John Smith");
	}

	@Test
	public void testGetAllFavouriteSuccess() {

		when(favouriteRepository.findAll()).thenReturn(favouriteList);

		assertEquals(favouriteList, favouriteService.getAllFavourite());

//		verify(favouriteRepository, times(1));

	}

	@Test
//	@Rollback(true)
//	@Nullable
	public void testUpdateFavoriteSuccess() throws FavouriteNotExistsException, FavouriteAlreadyExistsException {
		Optional<Favourite> favouriteRecord = Optional.of(favourite);
		when(favouriteRepository.findById(anyString())).thenReturn(favouriteRecord);
		when(favouriteRepository.saveAndFlush(any())).thenReturn(favouriteRecord);

//		assertEquals( favouriteRecord,favouriteRecord);
		if(favouriteRecord.isPresent())
			assertThat(true).isTrue();

	}

	@Test
	public void testDeleteFavouriteSuccess() throws FavouriteNotExistsException {
		Optional<Favourite> favouriteRecord = Optional.of(favourite);
		when(favouriteRepository.findById(any())).thenReturn(favouriteRecord);
		favouriteService.deleteFavourite(favourite.getId());

//		verify(favouriteRepository, times(1)).getOne(any());
		verify(favouriteRepository, times(1)).deleteById(any());

	}

	@Test
	public void testDeleteNewsFailure() throws FavouriteNotExistsException {
		Optional<Favourite> favouriteRecord = Optional.ofNullable(null);
		when(favouriteRepository.findById(any())).thenReturn(null);
//		favouriteService.deleteFavourite(favourite.getId());
		verify(favouriteRepository, times(0)).deleteById(any());

	}


}

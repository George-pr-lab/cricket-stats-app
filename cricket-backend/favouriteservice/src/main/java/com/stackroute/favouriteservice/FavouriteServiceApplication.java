package com.stackroute.favouriteservice;

import com.stackroute.favouriteservice.jwtfilter.AuthFilter;
import com.stackroute.favouriteservice.jwtfilter.JwtFilter;
//import jdk.internal.vm.annotation.ForceInline;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
//@CrossOrigin("*")
public class FavouriteServiceApplication {

	public static final String CARTS_PATH = "/api/v1/*";
	@Bean
	public FilterRegistrationBean<GenericFilterBean> jwtFilter(){
		final FilterRegistrationBean<GenericFilterBean>registrationBean =new FilterRegistrationBean<>();
		registrationBean.setFilter(new JwtFilter());
		registrationBean.addUrlPatterns("/api/v1/*");
		return registrationBean;
	}
//@Bean
//public FilterRegistrationBean<GenericFilterBean> jwtFilter(){
//	FilterRegistrationBean<GenericFilterBean> filterRegistrationBean = new FilterRegistrationBean<>();
//	filterRegistrationBean.setFilter(new AuthFilter());
//	filterRegistrationBean.addUrlPatterns(CARTS_PATH);
//	return filterRegistrationBean;
//}
	@Bean
	public WebMvcConfigurer configurer(){
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
//				WebMvcConfigurer.super.addCorsMappings(registry);
				registry.addMapping("/**").allowedOrigins("*").allowedHeaders("*").allowedMethods("*");
			}

		};
	}
	public static void main(String[] args) {
		SpringApplication.run(FavouriteServiceApplication.class, args);
	}

}


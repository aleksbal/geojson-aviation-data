package org.abl.aero.datasets;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;

import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.swagger2.annotations.EnableSwagger2WebMvc;
import springfox.documentation.spring.data.rest.configuration.SpringDataRestConfiguration;

import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.builders.RequestHandlerSelectors;

import java.time.format.DateTimeFormatter;
import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.jackson.JsonComponentModule;

@Slf4j
@EnableSwagger2WebMvc
@Configuration
@Import(SpringDataRestConfiguration.class)
//@Profile("production") // https://www.baeldung.com/spring-profiles
public class AppConfig {
  
		@Bean
		public Docket productApi() {
			 log.info("Configuring docket for Swagger...");
			 return new Docket(DocumentationType.SWAGGER_2).select()
					.apis(RequestHandlerSelectors.basePackage("org.abl.datasets")).build();
		}

}

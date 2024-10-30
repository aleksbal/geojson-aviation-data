package org.abl.aero.datasets;

import lombok.extern.slf4j.Slf4j;
import org.abl.aero.datasets.airports.AirportLoader;
import org.abl.aero.datasets.notams.NotamLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class Application {

	@Autowired
	private NotamLoader loader;

	@Autowired
	private AirportLoader airportLoader;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}

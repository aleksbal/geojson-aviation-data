package org.abl.aero.datasets;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.abl.aero.datasets.notam.NotamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class Application {

  @Autowired
  private NotamService importerNotamService;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@PostConstruct
	public void init() {
		log.info("Start importing from JSON file...");
		importerNotamService.importEvents();
		log.info("Importing finished!");
	}

}

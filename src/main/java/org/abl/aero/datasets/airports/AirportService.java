package org.abl.aero.datasets.airports;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/** On startup this service imports a JSON document from the classpath */
@Slf4j
@Service
public class AirportService {

  @Autowired private AirportRepository repository;

  @Value("${thisapp.file.airports}")
  private String airports;

  @Value("${thisapp.db.create}")
  private Boolean shouldCreate;
}

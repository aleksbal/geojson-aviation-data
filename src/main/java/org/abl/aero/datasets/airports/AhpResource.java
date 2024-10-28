package org.abl.aero.datasets.airports;

import java.util.List;
import org.abl.aero.datasets.airports.model.AirportHeliport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AhpResource {
  @Autowired
  private AirportRepository repository;
  @GetMapping("/api/airports")
  public final List<AirportHeliport> findAll() {

    return this.repository.findAll();
  }
}

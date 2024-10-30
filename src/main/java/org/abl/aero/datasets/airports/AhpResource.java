package org.abl.aero.datasets.airports;

import java.util.List;
import org.abl.aero.datasets.airports.model.AhpFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AhpResource {
  @Autowired
  private AirportRepository repository;

  @GetMapping("/api/airports")
  public final List<AhpFeature> getAll() {
    return repository.findAll();
  }
}

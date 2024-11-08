package org.abl.aero.datasets.airports;

import org.abl.aero.datasets.airports.model.FeatureCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AhpEndpoint {
  @Autowired
  private AirportRepository repository;

  @GetMapping("/api/airports")
  public final FeatureCollection getAll() {
   return new FeatureCollection("FeatureCollection", repository.findAll());
  }
}

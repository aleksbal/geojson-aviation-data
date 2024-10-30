package org.abl.aero.datasets.airports;

import java.util.List;
import org.abl.aero.datasets.airports.model.AhpFeature;
import org.abl.aero.datasets.airports.model.AirportHeliport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "airport", path = "airport")
public interface AirportRepository extends MongoRepository<AhpFeature, String> {

  // Find by airportId (e.g., ICAO code)
  AirportHeliport findByPropertiesDesignatorIgnoreCase(String airportId);

  // Search by name containing (case-insensitive)
  List<AirportHeliport> findByPropertiesNameContainingIgnoreCase(String name);
}

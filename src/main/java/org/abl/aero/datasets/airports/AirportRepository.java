package org.abl.aero.datasets.airports;

import java.util.List;
import org.abl.aero.datasets.airports.model.AirportHeliport;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Hypermedia as the Engine of Application State (HATEOAS)
 */
@RepositoryRestResource(collectionResourceRel = "airport", path = "airport")
public interface AirportRepository extends MongoRepository<AirportHeliport, String> {

  // Find by airportId (e.g., ICAO code)
  AirportHeliport findByDesignatorIgnoreCase(String airportId);

  // Search by name containing (case-insensitive)
  List<AirportHeliport> findByNameContainingIgnoreCase(String name);

  // Find airports within a certain distance from a point
}

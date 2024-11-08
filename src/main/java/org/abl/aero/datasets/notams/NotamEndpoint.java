package org.abl.aero.datasets.notams;

import org.abl.aero.datasets.notams.model.FeatureCollection;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Point;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metrics;

/**
 * An alternative endpoint made with standard REST controller.
 * Get input params are converted to Point and Distance in order
 * to be used in MongoDB geospatial query.
 */
@RestController
public class NotamEndpoint {
  @Autowired
  private NotamRepository repository;
  @GetMapping("/api/notams")
  public final FeatureCollection getByLocations(
    @RequestParam("lat") String latitude,
    @RequestParam("lon") String longitude,
    @RequestParam("radius") double distance) {

    var features = repository.findByGeometryNear(
        new Point(Double.parseDouble(longitude), Double.parseDouble(latitude)),
      new Distance(distance, Metrics.KILOMETERS)).stream().toList();

    return new FeatureCollection("NOTAM", features);
  }
  @GetMapping("/api/allnotams")
  public final FeatureCollection getAll() {
    return new FeatureCollection("FeatureCollection", repository.findAll());
  }
}

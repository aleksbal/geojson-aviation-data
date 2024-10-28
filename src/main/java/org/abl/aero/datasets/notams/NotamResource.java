package org.abl.aero.datasets.notams;

import java.util.List;
import org.abl.aero.datasets.notams.model.Notam;
import org.abl.aero.datasets.notams.model.Feature;
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
public class NotamResource {
  @Autowired
  private NotamRepository repository;
  @GetMapping("/api/notam")
  public final List<Notam> getByLocations(
    @RequestParam("lat") String latitude,
    @RequestParam("lon") String longitude,
    @RequestParam("radius") double distance) {

    return this.repository.findByGeometryNear(new Point(Double.parseDouble(longitude), Double.parseDouble(latitude)),
      new Distance(distance, Metrics.KILOMETERS));
  }

  @GetMapping("/api/notams")
  public final List<Feature> getAll() {
    return this.repository.findAll().stream()
        .map(k -> new Feature("Feature", k.getGeometry(), k)).toList();
  }
}

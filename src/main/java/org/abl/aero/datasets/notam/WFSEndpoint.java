package org.abl.aero.datasets.notam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * OGC WFS 2.0 endpoint made with standard REST controller.
 * Get input params are converted to Point and Distance in order
 * to be used in MongoDB geospatial query.
 */
@RestController
public class WFSEndpoint {

  @Autowired
  private NotamRepository repository;

  @GetMapping("/notam/wfs")
  public final List<NotamItem> getByLocations(
          @RequestParam("service") double service,
          @RequestParam("version") double version,
          @RequestParam("request") double request,
          @RequestParam("typeNames") double typeNames,
          @RequestParam("featureID") double featureID,
          @RequestParam("mexFeatures") double mexFeatures,
          @RequestParam("count") double count,
          @RequestParam("sortBY") double sortBY,
          @RequestParam("srsName") String srsName,
          @RequestParam("bbox") String bbox) {

    //return this.repository.findByGeometryNear(new Point(Double.valueOf(longitude), Double.valueOf(latitude)), new Distance(distance, Metrics.KILOMETERS));
    return null;
  }
}

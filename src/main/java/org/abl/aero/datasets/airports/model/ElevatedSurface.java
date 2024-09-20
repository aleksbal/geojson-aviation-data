package org.abl.aero.datasets.airports.model;

import org.springframework.data.mongodb.core.geo.GeoJsonPolygon;

public class ElevatedSurface {

  private GeoJsonPolygon geometry;
  private Double horizontalAccuracy;
  private Double elevation;
  private Double verticalAccuracy;

  // Constructors
  public ElevatedSurface() {}

  public ElevatedSurface(GeoJsonPolygon geometry, Double horizontalAccuracy,
      Double elevation, Double verticalAccuracy) {
    this.geometry = geometry;
    this.horizontalAccuracy = horizontalAccuracy;
    this.elevation = elevation;
    this.verticalAccuracy = verticalAccuracy;
  }

  // Getters and Setters
  // ...
}

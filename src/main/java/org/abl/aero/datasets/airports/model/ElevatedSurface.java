package org.abl.aero.datasets.airports;

import org.springframework.data.mongodb.core.geo.GeoJsonPolygon;


public class ElevatedSurface {

  private GeoJsonPolygon geometry; // GeoJSON Polygon representing the runway footprint

  private String surfaceCondition; // e.g., "Dry", "Wet", "Snowy"

  private String maintenanceStatus; // e.g., "Good", "Needs Repair"

  private String illuminationStatus; // e.g., "Operational", "Out of Service"

  // Constructors
  public ElevatedSurface() {}

  public ElevatedSurface(GeoJsonPolygon geometry, String surfaceCondition,
      String maintenanceStatus, String illuminationStatus) {
    this.geometry = geometry;
    this.surfaceCondition = surfaceCondition;
    this.maintenanceStatus = maintenanceStatus;
    this.illuminationStatus = illuminationStatus;
  }

  // Getters and Setters
  public GeoJsonPolygon getGeometry() {
    return geometry;
  }

  public void setGeometry(GeoJsonPolygon geometry) {
    this.geometry = geometry;
  }

  public String getSurfaceCondition() {
    return surfaceCondition;
  }

  public void setSurfaceCondition(String surfaceCondition) {
    this.surfaceCondition = surfaceCondition;
  }

  public String getMaintenanceStatus() {
    return maintenanceStatus;
  }

  public void setMaintenanceStatus(String maintenanceStatus) {
    this.maintenanceStatus = maintenanceStatus;
  }

  public String getIlluminationStatus() {
    return illuminationStatus;
  }

  public void setIlluminationStatus(String illuminationStatus) {
    this.illuminationStatus = illuminationStatus;
  }
}

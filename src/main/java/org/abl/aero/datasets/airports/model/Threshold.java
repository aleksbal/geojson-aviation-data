package org.abl.aero.datasets.airports.model;

public class Threshold {

  private Double elevation;
  private Double displacedThreshold;

  // Constructors
  public Threshold() {}

  public Threshold(Double elevation, Double displacedThreshold) {
    this.elevation = elevation;
    this.displacedThreshold = displacedThreshold;
  }

  // Getters and Setters
  public Double getElevation() {
    return elevation;
  }

  public void setElevation(Double elevation) {
    this.elevation = elevation;
  }

  public Double getDisplacedThreshold() {
    return displacedThreshold;
  }

  public void setDisplacedThreshold(Double displacedThreshold) {
    this.displacedThreshold = displacedThreshold;
  }
}

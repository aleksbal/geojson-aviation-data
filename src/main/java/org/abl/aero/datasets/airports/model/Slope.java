package org.abl.aero.datasets.airports.model;

public class Slope {

  private Double horizontal;
  private Double vertical;

  // Constructors
  public Slope() {}

  public Slope(Double horizontal, Double vertical) {
    this.horizontal = horizontal;
    this.vertical = vertical;
  }

  // Getters and Setters
  public Double getHorizontal() {
    return horizontal;
  }

  public void setHorizontal(Double horizontal) {
    this.horizontal = horizontal;
  }

  public Double getVertical() {
    return vertical;
  }

  public void setVertical(Double vertical) {
    this.vertical = vertical;
  }
}

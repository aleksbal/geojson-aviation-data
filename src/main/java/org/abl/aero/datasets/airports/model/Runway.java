package org.abl.aero.datasets.airports.model;

import java.util.List;

public class Runway {

  private String designator;
  private Double length;
  private Double width;
  private String surfaceComposition;
  private String status;
  private String direction;
  private List<RunwayElement> runwayElements;

  // Default Constructor
  public Runway() {
  }

  // Parameterized Constructor
  public Runway(String designator, Double length, Double width, String surfaceComposition, String status, String direction, List<RunwayElement> runwayElements) {
    this.designator = designator;
    this.length = length;
    this.width = width;
    this.surfaceComposition = surfaceComposition;
    this.status = status;
    this.direction = direction;
    this.runwayElements = runwayElements;
  }

  // Getters and Setters

  public String getDesignator() {
    return designator;
  }

  public void setDesignator(String designator) {
    this.designator = designator;
  }

  public Double getLength() {
    return length;
  }

  public void setLength(Double length) {
    this.length = length;
  }

  public Double getWidth() {
    return width;
  }

  public void setWidth(Double width) {
    this.width = width;
  }

  public String getSurfaceComposition() {
    return surfaceComposition;
  }

  public void setSurfaceComposition(String surfaceComposition) {
    this.surfaceComposition = surfaceComposition;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getDirection() {
    return direction;
  }

  public void setDirection(String direction) {
    this.direction = direction;
  }

  public List<RunwayElement> getRunwayElements() {
    return runwayElements;
  }

  public void setRunwayElements(List<RunwayElement> runwayElements) {
    this.runwayElements = runwayElements;
  }
}

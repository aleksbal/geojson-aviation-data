package org.abl.aero.datasets.airports.model;

import org.abl.aero.datasets.airports.model.RunwayElementType;

public class RunwayElement {

  private RunwayElementType type;
  private Integer sequenceNumber;
  private ElevatedSurface elevatedSurface;

  // Constructors
  public RunwayElement() {}

  public RunwayElement(RunwayElementType type, Integer sequenceNumber, ElevatedSurface elevatedSurface) {
    this.type = type;
    this.sequenceNumber = sequenceNumber;
    this.elevatedSurface = elevatedSurface;
  }

  // Getters and Setters
  // ...
}

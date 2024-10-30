package org.abl.aero.datasets.geometry;

record LineStringGeometry(String type, Position[] coordinates) implements Geometry {
  public LineStringGeometry(Position[] coordinates) {
    this("LineString", coordinates);
  }
}

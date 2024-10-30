package org.abl.aero.datasets.geometry;

record MultiLineStringGeometry(String type, Position[][] coordinates) implements Geometry {
  public MultiLineStringGeometry(Position[][] coordinates) {
    this("MultiLineString", coordinates);
  }
}

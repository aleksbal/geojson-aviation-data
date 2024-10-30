package org.abl.aero.datasets.geometry;

record MultiPointGeometry(String type, Position[] coordinates) implements Geometry {
  public MultiPointGeometry(Position[] coordinates) {
    this("MultiPoint", coordinates);
  }
}

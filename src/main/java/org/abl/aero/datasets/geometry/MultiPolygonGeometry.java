package org.abl.aero.datasets.geometry;

record MultiPolygonGeometry(String type, Position[][][] coordinates) implements Geometry {
  public MultiPolygonGeometry(Position[][][] coordinates) {
    this("MultiPolygon", coordinates);
  }
}

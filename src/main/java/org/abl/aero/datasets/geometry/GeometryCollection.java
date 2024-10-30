package org.abl.aero.datasets.geometry;

record GeometryCollection(String type, Geometry[] geometries) implements Geometry {
  public GeometryCollection(Geometry[] geometries) {
    this("GeometryCollection", geometries);
  }
}

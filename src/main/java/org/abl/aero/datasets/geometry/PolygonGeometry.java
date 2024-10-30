package org.abl.aero.datasets.geometry;

record PolygonGeometry(String type, Position[][] coordinates) implements Geometry {}

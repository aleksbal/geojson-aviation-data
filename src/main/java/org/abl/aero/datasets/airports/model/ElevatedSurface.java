package org.abl.aero.datasets.airports.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.abl.aero.datasets.geometry.Geometry;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ElevatedSurface(
    Geometry geometry,
    Double horizontalAccuracy,
    Double elevation,
    Double verticalAccuracy
) {}

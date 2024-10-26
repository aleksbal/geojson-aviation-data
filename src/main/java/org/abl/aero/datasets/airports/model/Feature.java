package org.abl.aero.datasets.airports.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Feature(
    String type,
    Geometry geometry,
    AirportHeliport properties
) {}


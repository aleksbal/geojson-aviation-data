package org.abl.aero.datasets.airports.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.abl.aero.datasets.geometry.Geometry;
import org.springframework.data.mongodb.core.mapping.Document;

@JsonIgnoreProperties(ignoreUnknown = true)
@Document(collection = "airport_heliports")
public record AhpFeature(
    String type,
    Geometry geometry,
    AirportHeliport properties
) {}


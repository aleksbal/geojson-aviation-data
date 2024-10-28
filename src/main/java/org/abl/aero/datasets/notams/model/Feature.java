package org.abl.aero.datasets.notams.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Feature(
    String type,
    GeoJsonPoint geometry,
    Notam properties
) {}

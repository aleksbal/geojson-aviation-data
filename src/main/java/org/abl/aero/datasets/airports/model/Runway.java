package org.abl.aero.datasets.airports.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Runway(
    String designator,
    Double length,
    Double width,
    String surfaceComposition,
    String status,
    String direction,
    //@Field("runwayElements")
    List<RunwayElement> runwayElements
) {}

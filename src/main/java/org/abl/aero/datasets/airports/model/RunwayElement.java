package org.abl.aero.datasets.airports.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record RunwayElement(
    RunwayElementType type,
    Integer sequenceNumber,
    ElevatedSurface elevatedSurface
) {}

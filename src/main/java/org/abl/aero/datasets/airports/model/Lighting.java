package org.abl.aero.datasets.airports.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Lighting(
    Boolean centerLineLights, Boolean touchdownZoneLights, Boolean aimingPointLights) {}

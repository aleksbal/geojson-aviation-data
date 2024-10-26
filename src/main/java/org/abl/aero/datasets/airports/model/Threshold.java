package org.abl.aero.datasets.airports.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Threshold (Double elevation, Double displacedThreshold) { }

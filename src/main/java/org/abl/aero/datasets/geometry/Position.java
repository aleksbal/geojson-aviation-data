package org.abl.aero.datasets.geometry;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonDeserialize(using = PositionDeserializer.class)
@JsonSerialize(using= PositionSerializer.class)
public record Position(double longitude, double latitude) {}

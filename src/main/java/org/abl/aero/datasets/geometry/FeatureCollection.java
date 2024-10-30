package org.abl.aero.datasets.geometry;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import org.abl.aero.datasets.airports.model.AhpFeature;

@JsonIgnoreProperties(ignoreUnknown = true)
public record FeatureCollection(
    String type,
    List<AhpFeature> ahpFeatures
) {}


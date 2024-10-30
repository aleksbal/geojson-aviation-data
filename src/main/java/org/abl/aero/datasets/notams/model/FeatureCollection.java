package org.abl.aero.datasets.notams.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record FeatureCollection(
    String type,
    List<NotamFeature> features
) {}


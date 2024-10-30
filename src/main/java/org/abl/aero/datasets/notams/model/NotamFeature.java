package org.abl.aero.datasets.notams.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.abl.aero.datasets.geometry.Geometry;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

@JsonIgnoreProperties(ignoreUnknown = true)
@Document(collection = "notams")
public record NotamFeature(
    String type,
    @GeoSpatialIndexed(name = "geometry", type = GeoSpatialIndexType.GEO_2DSPHERE)
    Geometry geometry,
    Notam properties
) {}

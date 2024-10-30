package org.abl.aero.datasets.geometry;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import java.io.IOException;
import java.util.List;

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    property = "type",
    visible = true
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = PointGeometry.class, name = "Point"),
    @JsonSubTypes.Type(value = LineStringGeometry.class, name = "LineString"),
    @JsonSubTypes.Type(value = PolygonGeometry.class, name = "Polygon"),
    @JsonSubTypes.Type(value = MultiPointGeometry.class, name = "MultiPoint"),
    @JsonSubTypes.Type(value = MultiLineStringGeometry.class, name = "MultiLineString"),
    @JsonSubTypes.Type(value = MultiPolygonGeometry.class, name = "MultiPolygon"),
    @JsonSubTypes.Type(value = GeometryCollection.class, name = "GeometryCollection")
})
public sealed interface Geometry permits PointGeometry, LineStringGeometry, PolygonGeometry,
    MultiPointGeometry, MultiLineStringGeometry, MultiPolygonGeometry, GeometryCollection {
  String type();
}


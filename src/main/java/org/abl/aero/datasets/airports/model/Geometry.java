package org.abl.aero.datasets.airports.model;

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

// Custom deserializer for Position
@JsonDeserialize(using = PositionDeserializer.class)
record Position(double longitude, double latitude) {}

class PositionDeserializer extends JsonDeserializer<Position> {
  @Override
  public Position deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
    List<Double> coordinates = ctxt.readValue(p, List.class);
    if (coordinates.size() != 2)
      throw new InvalidFormatException(p, "Invalid position array, must have exactly two elements",
          coordinates, Position.class);
    return new Position(coordinates.get(0), coordinates.get(1));
  }
}
record PointGeometry(
    String type,
    Position coordinates

) implements Geometry {
  public PointGeometry(List<Double> coordintates) {
    this("Point", new Position(coordintates.get(0), coordintates.get(1)));
  }
}

record LineStringGeometry(
    String type,
    Position[] coordinates
) implements Geometry {
  public LineStringGeometry(Position[] coordinates) {
    this("LineString", coordinates);
  }
}

record PolygonGeometry(
    String type,
    Position[][] coordinates
) implements Geometry {
  public PolygonGeometry(Position[][] coordinates) {
    this("Polygon", coordinates);
  }
}

record MultiPointGeometry(
    String type,
    Position[] coordinates
) implements Geometry {
  public MultiPointGeometry(Position[] coordinates) {
    this("MultiPoint", coordinates);
  }
}

record MultiLineStringGeometry(
    String type,
    Position[][] coordinates
) implements Geometry {
  public MultiLineStringGeometry(Position[][] coordinates) {
    this("MultiLineString", coordinates);
  }
}

record MultiPolygonGeometry(
    String type,
    Position[][][] coordinates
) implements Geometry {
  public MultiPolygonGeometry(Position[][][] coordinates) {
    this("MultiPolygon", coordinates);
  }
}

record GeometryCollection(
    String type,
    Geometry[] geometries
) implements Geometry {
  public GeometryCollection(Geometry[] geometries) {
    this("GeometryCollection", geometries);
  }
}


package org.abl.aero.datasets.geometry;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import java.io.IOException;
import java.util.List;

class PositionDeserializer extends JsonDeserializer<Position> {
  @Override
  public Position deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
    List<Double> coordinates = ctxt.readValue(p, List.class);
    if (coordinates.size() != 2)
      throw new InvalidFormatException(
          p, "Invalid position array, must have exactly two elements", coordinates, Position.class);
    return new Position(coordinates.get(0), coordinates.get(1));
  }
}

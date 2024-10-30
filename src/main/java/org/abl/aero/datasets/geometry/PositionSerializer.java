package org.abl.aero.datasets.geometry;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;

public class PositionSerializer extends JsonSerializer<Position> {

  @Override
  public void serialize(Position position, JsonGenerator gen, SerializerProvider serializers) throws IOException {
    // Write the Position as a GeoJSON-compliant coordinate array: [longitude, latitude]
    gen.writeStartArray();
    gen.writeNumber(position.longitude());  // Longitude first
    gen.writeNumber(position.latitude());   // Latitude second
    gen.writeEndArray();
  }
}

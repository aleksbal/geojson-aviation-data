package org.abl.aero.datasets.airports.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum RunwayElementType {
  RUNWAY("RUNWAY"),
  STOPWAY("STOPWAY"),
  CLEARWAY("CLEARWAY"),
  BLAST_PAD("BLAST_PAD"),
  RESA("RESA"),
  STRIP("STRIP"),
  DISPLACED_AREA("DISPLACED_AREA"),
  TOUCHDOWN_ZONE("TOUCHDOWN_ZONE"),
  OVERRUN_AREA("OVERRUN_AREA"),
  ACCELERATION_STOPWAY("ACCELERATION_STOPWAY"),
  SHOULDER("SHOULDER"),
  SLOPE("SLOPE"),

  THRESHOLD("THRESHOLD");

  private final String value;

  RunwayElementType(String value) {
    this.value = value;
  }

  @JsonCreator
  public static RunwayElementType fromValue(String value) {
    for (RunwayElementType type : RunwayElementType.values()) {
      if (type.value.equalsIgnoreCase(value)) {
        return type;
      }
    }
    throw new IllegalArgumentException("Unknown RunwayElementType: " + value);
  }

  @JsonValue
  public String getValue() {
    return value;
  }
}

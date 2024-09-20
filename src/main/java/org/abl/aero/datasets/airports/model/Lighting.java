package org.abl.aero.datasets.airports.model;

public class Lighting {

  private Boolean centerLineLights;
  private Boolean touchdownZoneLights;
  private Boolean aimingPointLights;

  // Constructors
  public Lighting() {}

  public Lighting(Boolean centerLineLights, Boolean touchdownZoneLights, Boolean aimingPointLights) {
    this.centerLineLights = centerLineLights;
    this.touchdownZoneLights = touchdownZoneLights;
    this.aimingPointLights = aimingPointLights;
  }

  // Getters and Setters
  public Boolean getCenterLineLights() {
    return centerLineLights;
  }

  public void setCenterLineLights(Boolean centerLineLights) {
    this.centerLineLights = centerLineLights;
  }

  public Boolean getTouchdownZoneLights() {
    return touchdownZoneLights;
  }

  public void setTouchdownZoneLights(Boolean touchdownZoneLights) {
    this.touchdownZoneLights = touchdownZoneLights;
  }

  public Boolean getAimingPointLights() {
    return aimingPointLights;
  }

  public void setAimingPointLights(Boolean aimingPointLights) {
    this.aimingPointLights = aimingPointLights;
  }
}

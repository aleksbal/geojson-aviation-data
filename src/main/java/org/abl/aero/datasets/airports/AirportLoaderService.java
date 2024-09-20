package org.abl.aero.datasets.airports;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.abl.aero.datasets.airports.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.geo.GeoJsonPolygon;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class AirportLoaderService {

  @Autowired
  private AirportRepository airportRepository;

  private final ObjectMapper objectMapper = new ObjectMapper();

  @PostConstruct
  public void loadData() {
    loadAirports();
  }

  private void loadAirports() {
    try {
      JsonNode rootNode = objectMapper.readTree(new ClassPathResource("airports.geojson").getInputStream());
      JsonNode featuresNode = rootNode.get("features");
      List<AirportHeliport> airports = new ArrayList<>();

      for (JsonNode featureNode : featuresNode) {
        JsonNode properties = featureNode.get("properties");
        JsonNode geometry = featureNode.get("geometry");

        // Parse AIXM 5.1 attributes
        String designator = properties.get("designator").asText();
        String name = properties.get("name").asText();
        String type = properties.get("type").asText();
        String cityServed = properties.get("cityServed").asText();
        String locationIndicatorICAO = properties.get("locationIndicatorICAO").asText();
        String controlType = properties.get("controlType").asText();
        Double fieldElevation = properties.get("fieldElevation").asDouble();
        String fieldElevationUnit = properties.get("fieldElevationUnit").asText();
        String magneticVariation = properties.get("magneticVariation").asText();
        String dateMagneticVariation = properties.get("dateMagneticVariation").asText();
        String referenceTemperature = properties.get("referenceTemperature").asText();
        String altimeterCheckLocation = properties.get("altimeterCheckLocation").asText();
        String secondaryPowerSupply = properties.get("secondaryPowerSupply").asText();
        String windDirectionIndicator = properties.get("windDirectionIndicator").asText();
        String landingDirectionIndicator = properties.get("landingDirectionIndicator").asText();
        String transitionAltitude = properties.get("transitionAltitude").asText();
        String transitionLevel = properties.get("transitionLevel").asText();
        String permittedOperations = properties.get("permittedOperations").asText();
        String rescueAndFireFighting = properties.get("rescueAndFireFighting").asText();
        String status = properties.get("status").asText();

        // Reference Point (ARP)
        double longitude = geometry.get("coordinates").get(0).asDouble();
        double latitude = geometry.get("coordinates").get(1).asDouble();
        GeoJsonPoint arp = new GeoJsonPoint(longitude, latitude);

        // Parse Runways
        List<Runway> runways = new ArrayList<>();
        JsonNode runwaysNode = properties.get("runways");

        if (runwaysNode != null && runwaysNode.isArray()) {
          for (JsonNode runwayNode : runwaysNode) {
            String runwayDesignator = runwayNode.get("designator").asText();
            Double runwayLength = runwayNode.get("length").asDouble();
            Double runwayWidth = runwayNode.get("width").asDouble();
            String surfaceComposition = runwayNode.get("surfaceComposition").asText();
            String runwayStatus = runwayNode.get("status").asText();
            String direction = runwayNode.get("direction").asText();

            // Parse Runway Elements
            List<RunwayElement> runwayElements = new ArrayList<>();
            JsonNode runwayElementsNode = runwayNode.get("runwayElements");

            if (runwayElementsNode != null && runwayElementsNode.isArray()) {
              for (JsonNode elementNode : runwayElementsNode) {
                var elementType = org.abl.aero.datasets.airports.model.RunwayElementType.valueOf(elementNode.get("type").asText().toUpperCase());
                int sequenceNumber = elementNode.get("sequenceNumber").asInt();

                // ElevatedSurface
                ElevatedSurface elevatedSurface = null;
                if (elementNode.has("elevatedSurface")) {
                  JsonNode elevatedSurfaceNode = elementNode.get("elevatedSurface");

                  // Geometry
                  GeoJsonPolygon polygon = null;
                  if (elevatedSurfaceNode.has("geometry")) {
                    JsonNode geometryNode = elevatedSurfaceNode.get("geometry");
                    if (geometryNode.get("type").asText().equalsIgnoreCase("Polygon")) {
                      JsonNode coordinatesNode = geometryNode.get("coordinates");
                      JsonNode linearRingNode = coordinatesNode.get(0);
                      List<Point> ringPoints = new ArrayList<>();
                      for (JsonNode coordNode : linearRingNode) {
                        double lon = coordNode.get(0).asDouble();
                        double lat = coordNode.get(1).asDouble();
                        GeoJsonPoint point = new GeoJsonPoint(lon, lat);
                        ringPoints.add(point);
                      }
                      polygon = new GeoJsonPolygon(ringPoints);
                    }
                  }

                  double horizontalAccuracy = elevatedSurfaceNode.get("horizontalAccuracy").asDouble();
                  double elevationAttr = elevatedSurfaceNode.get("elevation").asDouble();
                  double verticalAccuracy = elevatedSurfaceNode.get("verticalAccuracy").asDouble();

                  elevatedSurface = new ElevatedSurface(polygon, horizontalAccuracy, elevationAttr, verticalAccuracy);
                }

                RunwayElement runwayElement = new RunwayElement(elementType, sequenceNumber, elevatedSurface);
                runwayElements.add(runwayElement);
              }
            }

            Runway runway = new Runway(runwayDesignator, runwayLength, runwayWidth, surfaceComposition, runwayStatus, direction, runwayElements);
            runways.add(runway);
          }
        }

        // Create AirportHeliport object
        AirportHeliport airport = new AirportHeliport(
            designator,
            name,
            type,
            cityServed,
            locationIndicatorICAO,
            controlType,
            fieldElevation,
            fieldElevationUnit,
            magneticVariation,
            dateMagneticVariation,
            referenceTemperature,
            altimeterCheckLocation,
            secondaryPowerSupply,
            windDirectionIndicator,
            landingDirectionIndicator,
            transitionAltitude,
            transitionLevel,
            permittedOperations,
            rescueAndFireFighting,
            status,
            arp,
            runways
        );

        airports.add(airport);
      }

      airportRepository.saveAll(airports);
      System.out.println("Airports loaded successfully.");
    } catch (IOException e) {
      System.err.println("Error loading Airports: " + e.getMessage());
    }
  }
}


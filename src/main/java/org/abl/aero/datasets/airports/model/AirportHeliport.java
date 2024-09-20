package org.abl.aero.datasets.airports.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "airport_heliports")
public class AirportHeliport {

	@Id
	private String id;

	// AIXM 5.1 attributes
	private String designator;                // designator
	private String name;                      // name
	private String type;                      // type (e.g., AIRPORT, HELIPORT)
	private String cityServed;                // servedCity
	private String locationIndicatorICAO;     // locationIndicatorICAO
	private String controlType;               // controlType (e.g., CONTROLLED, UNCONTROLLED)
	private Double fieldElevation;            // fieldElevation
	private String fieldElevationUnit;        // fieldElevationReference
	private String magneticVariation;         // magneticVariation
	private String dateMagneticVariation;     // dateMagneticVariation
	private String referenceTemperature;      // referenceTemperature
	private String altimeterCheckLocation;    // altimeterCheckLocation
	private String secondaryPowerSupply;      // secondaryPowerSupply
	private String windDirectionIndicator;    // windDirectionIndicator
	private String landingDirectionIndicator; // landingDirectionIndicator
	private String transitionAltitude;        // transitionAltitude
	private String transitionLevel;           // transitionLevel
	private String permittedOperations;       // permittedOperations
	private String rescueAndFireFighting;     // rescueAndFireFighting
	private String status;                    // operationalStatus

	// Reference point
	@GeoSpatialIndexed(type = org.springframework.data.mongodb.core.index.GeoSpatialIndexType.GEO_2DSPHERE)
	private GeoJsonPoint arp; // Aerodrome Reference Point

	// Runways
	private List<Runway> runways;

	// Constructors
	public AirportHeliport() {}

	public AirportHeliport(
			String designator,
			String name,
			String type,
			String cityServed,
			String locationIndicatorICAO,
			String controlType,
			Double fieldElevation,
			String fieldElevationUnit,
			String magneticVariation,
			String dateMagneticVariation,
			String referenceTemperature,
			String altimeterCheckLocation,
			String secondaryPowerSupply,
			String windDirectionIndicator,
			String landingDirectionIndicator,
			String transitionAltitude,
			String transitionLevel,
			String permittedOperations,
			String rescueAndFireFighting,
			String status,
			GeoJsonPoint arp,
			List<Runway> runways
	) {
		this.designator = designator;
		this.name = name;
		this.type = type;
		this.cityServed = cityServed;
		this.locationIndicatorICAO = locationIndicatorICAO;
		this.controlType = controlType;
		this.fieldElevation = fieldElevation;
		this.fieldElevationUnit = fieldElevationUnit;
		this.magneticVariation = magneticVariation;
		this.dateMagneticVariation = dateMagneticVariation;
		this.referenceTemperature = referenceTemperature;
		this.altimeterCheckLocation = altimeterCheckLocation;
		this.secondaryPowerSupply = secondaryPowerSupply;
		this.windDirectionIndicator = windDirectionIndicator;
		this.landingDirectionIndicator = landingDirectionIndicator;
		this.transitionAltitude = transitionAltitude;
		this.transitionLevel = transitionLevel;
		this.permittedOperations = permittedOperations;
		this.rescueAndFireFighting = rescueAndFireFighting;
		this.status = status;
		this.arp = arp;
		this.runways = runways;
	}

	// Getters and Setters
	// ...

	// Add getters and setters for each attribute here
}

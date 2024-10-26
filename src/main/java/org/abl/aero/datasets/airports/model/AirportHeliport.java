package org.abl.aero.datasets.airports.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@Document(collection = "airport_heliports")
@JsonIgnoreProperties(ignoreUnknown = true)
public record AirportHeliport(
		@Id
		String designator,  // Using 'designator' as the unique identifier
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
		List<Runway> runways
) {}

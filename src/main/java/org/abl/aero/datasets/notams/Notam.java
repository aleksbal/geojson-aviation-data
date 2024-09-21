package org.abl.aero.datasets.notams;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;

/**
 * Domain class for NOTAM message
 */
@Document(collection = "notams")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Notam {
	
	@Id
	private String idb;
	private String id;
	private String entity;
	private String status;
	private String Qcode;
	private String Area;
	private String SubArea;
	private String condition;
	private String subject;
	private String modifier;
	private String location;
	
	@TextIndexed
	private String message;
	
	@TextIndexed
	private String all;

	//@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime startdate;

	//@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime enddate;
	private Boolean isICAO;
	private String Created;
	private String key;
	private String type;
	private String stateCode;
	private String stateName;

	@GeoSpatialIndexed(name = "geometry", type = GeoSpatialIndexType.GEO_2DSPHERE)
	private GeoJsonPoint geometry;

 }

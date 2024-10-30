package org.abl.aero.datasets.notams.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Notam (
	@Id
	String idb,
	String id,
	String entity,
	String status,
	String Qcode,
	String Area,
	String SubArea,
	String condition,
	String subject,
	String modifier,
	String location,
	@TextIndexed
	String message,
	@TextIndexed
	String all,
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	LocalDateTime startdate,
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	LocalDateTime enddate,
	Boolean isICAO,
	String Created,
	String key,
	String type,
	String stateCode,
	String stateName) {}

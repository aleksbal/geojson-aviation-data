package org.abl.aero.datasets.airports;

import static java.util.Objects.requireNonNull;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.MongoException;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Indexes;
import java.nio.file.Files;
import java.nio.file.Paths;
import lombok.extern.slf4j.Slf4j;
import org.abl.aero.datasets.airports.model.AirportHeliport;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.data.mongodb.core.CollectionCallback;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

/** On startup this service imports a JSON document from the classpath */
@Slf4j
@Service
public class AirportService {

  @Autowired private AirportRepository repository;

  @Value("${thisapp.file.airports}")
  private String airports;

  @Value("${thisapp.db.create}")
  private Boolean shouldCreate;
}

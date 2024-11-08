package org.abl.aero.datasets.airports;

import com.fasterxml.jackson.core.type.TypeReference;
import jakarta.annotation.PostConstruct;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Objects;
import lombok.extern.slf4j.Slf4j;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.abl.aero.datasets.airports.model.AhpFeature;
import org.abl.aero.datasets.airports.model.FeatureCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AirportLoader {

  @Autowired
  private AirportRepository repo;
  @Autowired
  private MongoTemplate mongoTemplate;
  @Value("${thisapp.db.create}")
  private Boolean shouldCreate;
  @PostConstruct
  public void loadAirports() throws Exception {
    loadData();
  }
  public void loadData() throws Exception {

    if(!shouldCreate) {
      log.info("Initial data import not required, exiting import...");
      return;
    }

    log.info("Starting data import using low level db functions...");
    mongoTemplate.dropCollection(AhpFeature.class);

    var mapper = new ObjectMapper();

    var reader = Files.newBufferedReader(Paths.get(
        Objects.requireNonNull(getClass().getClassLoader()
            .getResource("airports.geojson")).toURI()));

    var airports = mapper.readValue(reader, new TypeReference<FeatureCollection>() {});

    repo.saveAll(airports.features());
  }
}

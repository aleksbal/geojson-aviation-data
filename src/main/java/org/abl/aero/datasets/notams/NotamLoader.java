package org.abl.aero.datasets.notams;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.annotation.PostConstruct;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Objects;
import lombok.extern.slf4j.Slf4j;
import org.abl.aero.datasets.notams.model.FeatureCollection;
import org.abl.aero.datasets.notams.model.NotamFeature;
import org.abl.aero.datasets.notams.model.Notam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class NotamLoader {

  @Autowired
  private NotamRepository repo;
  @Autowired
  private MongoTemplate template;
  @Value("${thisapp.db.create}")
  private Boolean shouldCreate;
  @PostConstruct
  public void loadObjects() throws Exception {
    if(!shouldCreate) {
      log.info("Initial data import not required, exiting import...");
      return;
    }
    template.dropCollection(Notam.class);
    loadData();
  }

  public void loadData() throws Exception {

    if(!shouldCreate) {
      log.info("Initial data import not required, exiting import...");
      return;
    }

    log.info("Starting data import using low level db functions...");
    template.dropCollection(NotamFeature.class);

    var mapper = new ObjectMapper();
    mapper.registerModule(new JavaTimeModule());

    var reader = Files.newBufferedReader(Paths.get(
        Objects.requireNonNull(getClass().getClassLoader()
            .getResource("notams.geojson")).toURI()));

    FeatureCollection notams = mapper.readValue(reader, new TypeReference<>() {});

    repo.saveAll(notams.features());
  }
}

package org.abl.aero.datasets.airports;

import jakarta.annotation.PostConstruct;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Objects;
import org.abl.aero.datasets.airports.model.AirportsData;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.abl.aero.datasets.airports.model.Feature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AirportLoader {

  @Autowired
  private AirportRepository airportHeliportRepository;
  @PostConstruct
  public void loadAirports() throws Exception {
    loadData();
  }
  public void loadData() throws Exception {
    var mapper = new ObjectMapper();

    var reader = Files.newBufferedReader(Paths.get(
        Objects.requireNonNull(getClass().getClassLoader()
            .getResource("airports.geojson")).toURI()));

    var airportsData = mapper.readValue(reader, AirportsData.class);

    var airportHeliports = airportsData.features()
        .stream()
        .map(Feature::properties).toList();

    airportHeliportRepository.saveAll(airportHeliports);
  }
}
